<?php
/**
 * @file
 * Contains \Drupal\dsu_srh\Controller\Importer
 */

namespace Drupal\dsu_srh\Controller;

use Drupal;
use Drupal\Component\Serialization\Json;
use Drupal\Component\Utility\Unicode;
use Drupal\Core\Config\ConfigFactory;
use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\search_api\Entity\Index;
use Drupal\taxonomy\Entity\Term;
use Drupal\taxonomy\Entity\Vocabulary;
use GuzzleHttp\Client;
use GuzzleHttp\Promise;
use Symfony\Component\DependencyInjection\ContainerInterface;


class Importer extends ControllerBase {

  /**
   * Configuration state Drupal Site
   *
   * @var array
   */
  protected $configFactory;

  /**
   * Configuration state Drupal Site
   *
   * @var array
   */
  protected $serialization;


  public function __construct(ConfigFactory $configFactory, Json $serialization) {
    $this->configFactory = $configFactory;
    $this->serialization = $serialization;

  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('serialization.json')
    );
  }


  /**
   * @param $success
   * @param $operations
   */
  public static function syncroRecipesFinish($success, $operations) {
    // Run finish operation after completions of batch.
    if ($success) {

      // Get save history of indexing in config variables and convert json_decode
      Importer::toggleSearchIndexingServer(TRUE);

      $message = t('Synchronize Released, check in admin/content to see the recipes, on check /recipes to use search feature, also there is a block call Recipie Block in block layout');
    }
    else {
      $message = t('Finished with an error.');
    }
    drupal_set_message($message);
  }

  /*
   * Main IMPORTATION Function.
   * This function receive an array $values = array('values' => [the ids], 'market' => [market info])
   * This function call SRH with the market information, and gets one by one the specified recipes
   * Check if a recipe has to be imported, updates or unpublished following the main configuration
   */
  public static function syncroRecipes($values) {
    if (is_array($values['values'])) {
      $ids = $values['values'];
    }
    else {
      $ids = [$values['values']];
    }
    // Market language code.
    $langcode = $values['market']['langcode'];
    // Get connects markets.
    $locale = $values['market']['connect_markets'];

    // Asynchronous Guzzle Calls.
    $config = Drupal::service('config.factory')
      ->getEditable('dsu_srh.settings');
    $query = [
      'ciamnum' => $config->get('dsu_srh.dsu_connect_ciamnum'),
      'locale' => !empty($config->get('dsu_srh.dsu_connect_markets')) ? $config->get('dsu_srh.dsu_connect_markets') : $config->get('dsu_srh.dsu_connect_locales')[0]['connect_markets'],
      'market' => $config->get('dsu_srh.dsu_connect_market_code'),
      'http_errors' => FALSE,
      'sortBy' => 'updateDate',
      'sortType' => 'DESC',
    ];

    $client = new Client(['headers' => ['x-api-key' => $config->get('dsu_srh.dsu_connect_apikey')]]);
    // For each Recipe ID, we send and Asynchronous call to SRH.
    foreach ($ids as $value) {
      $promises[] = $client->getAsync($config->get('dsu_srh.dsu_connect_url') . '/recipes/' . $value, ['query' => $query]);
    }
    if ($promises != NULL) {
      // Wait for the requests to complete, even if some of them fail.
      $results = Promise\settle($promises)->wait();
      $serialization = new Json();
      /*
      / For each result we check if exists, if needs to update or if needs to be unpublished.
      */
      foreach ($results as $key => $recipe) {
        if (!isset($recipe['value']) || empty($recipe['value'])) {
          continue;
        }
        if (isset($recipe['value'])) {
          $recipeData = $serialization->decode($recipe['value']->getBody()
            ->getContents());

          // Get Nid if recipe is exist or not.
          $entity_ids = Drupal::entityQuery('node')
            ->condition('type', 'recipe')
            ->condition('field_recipe_id', $recipeData['id'])
            ->execute();
          $node_exists = !empty($entity_ids) ? Node::load($entity_ids [key($entity_ids)]) : NULL;

          $updateDate = strtotime($recipeData['updateDate']);
          //Check if it has new tag before importing.
          if ($updateDate > (time() - $config->get('dsu_srh.dsu_connect_isnew'))) {
            $recipeData['isnew'] = TRUE;
          }
          else {
            $recipeData['isnew'] = FALSE;
          }
          if ($node_exists == NULL && $recipeData['isPublished'] == TRUE) {
            // The Recipe doesn't exists locally. Importing it.
            $parameters = [
              'content' => $recipeData,
              'langcode' => $langcode,
            ];
            $status = Importer::saveRecipe($parameters, $node_exists);
          }
          else {
            if ($recipeData['isPublished'] == TRUE) {
              if ($node_exists->getCreatedTime()) {
                // If update time it's higher than the local updated time, we need to update.
                $parameters = [
                  'content' => $recipeData,
                  'langcode' => $langcode,
                ];
                $status = Importer::saveRecipe($parameters, $node_exists);
              }
              else {
                // Check for recipe is new or not.
                $recipe_isnew = $node_exists->get('field_recipe_isnew')
                  ->getValue();
                if ($recipe_isnew['0']['value'] != $recipeData['isnew']) {
                  // Check if has the new tag.
                  $node_exists->set('field_recipe_isnew', $recipeData['isnew']);
                  $node_exists->save();
                }
              }
            }
            else {
              // CLEAN THE RECIPE LOCALLY, Un-publish if is Unpublished in SRH.
              if (!empty($node_exists)) {
                $node_exists->setPublished(FALSE);
              }
            }
          }
        }
        else {
          // Petition comes with NULL.
          Drupal::logger('SRH')->notice('NULL Recipe response');
        }
      }
    }
  }


  /**
   * @param $parameters
   * @param null $node
   *
   * FUNCTION: Preflight call to get All id of specific market & specific brands
   * configured in the UI by the admin
   *
   * @return string
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  protected static function saveRecipe($parameters, $node = NULL) {
    $content = $parameters['content'];

    $time = microtime(TRUE);
    if ($parameters['langcode'] == '') {
      $langcode = Drupal::languageManager()->getCurrentLanguage()->getId();
    }
    else {
      $langcode = $parameters['langcode'];
    }

    // Check for old nodes.
    if (is_object($node) && isset($node)) {
      // Unset all paragraph related to recipes.
      $reset_fields = [
        'field_recipe_ingredient',
        'field_recipe_macronutrients',
        'field_recipe_steps',
        'field_recipe_tools',
        'field_recipe_ingredients_taxo',
        'field_recipe_tags',
        'field_recipe_tags_hierarchical',
        'field_general_tips',
        'field_recipe_images',
        'field_recipe_tag_course',
        'field_recipe_tag_cuisine',
        'field_recipe_tag_free_tag',
        'field_recipe_tag_lifestyle',
        'field_recipe_tag_meal',
        'field_recipe_tag_nutritional',
        'field_recipe_tag_occasion',
        'field_recipe_tag_season',
        'field_recipe_variants',
      ];
      foreach ($reset_fields as $fields) {
        unset($node->{$fields});
      }
    }
    elseif ($node == NULL) {
      /*
      /* Generating node entity, and setting the content from the recipe
       */
      $node = Node::create(['type' => 'recipe']);
      $node->enforceIsNew();
    }

    //Create recipes variants.
    $variants = Importer::get_recipe_variants($content['id']);
    $node->set('field_recipe_variants', $variants);

    $node->set('title', $content['name']);
    $node->set('created', $time);
    if (!isset($content['SEOUrl'])) {
      // If SRH recipe seo url is not found.
      $path = '/recipes/' . $content['id'];
      $node->set('path', $path);
    }
    // Saving SRH Seo url in field.
    $node->set('field_recipe_seo_url', $content['SEOUrl']);
    $node->set('langcode', $langcode);
    $node->set('changed', strtotime($content['updateDate']));
    $node->set('field_recipe_updatedate', strtotime($content['updateDate']));
    $node->set('field_recipe_isnew', $content['isnew']);
    $node->set('field_recipe_name', $content['name_speechOutput']);
    $node->set('field_recipe_description', $content['description']);
    $node->set('field_recipe_cooking_time', $content['cookingTime']);
    $node->set('field_recipe_number_servings', $content['numberOfServings']);
    $node->set('field_recipe_chefname', $content['chefName']);
    $node->set('field_recipe_description_speecho', $content['description_speechOutput'][0]);
    $node->set('field_recipe_id', $content['id']);
    if (isset($content['totalTime'])) {
      $node->set('field_recipe_total_time', $content['totalTime']);
    }
    else {
      $total_time = $content['prepTime'] + $content['cookingTime'] +
        $content['servingTime'] + $content['waitingTime'];
      $node->set('field_recipe_total_time', $total_time);
    }
    $node->set('field_recipe_brand', $content['brand']);
    $node->set('field_recipe_servings_time', $content['servingTime']);
    $node->set('field_recipe_source', $content['source']);
    $node->set('field_recipe_score', $content['score']);
    $node->set('field_recipe_serving_displayname', $content['servingsDisplayName']);
    $node->set('field_recipe_ispublished', $content['isPublished']);
    $node->set('field_recipe_original_market_id', $content['originalMarketId']);
    // Add SEO tags from SRH.
    $node->set('field_meta_tags', serialize([
      'title' => $content['SEOTitle'],
      'description' => $content['SEODescription'],
    ]));

    if (isset($content['sharing'])) {
      $node->set('field_recipe_sharing', json_encode($content['sharing']));
    }
    $node->set('field_recipe_wait_time', $content['waitingTime']);
    if (isset($content['difficulty']['description'])) {
      $node->set('field_recipe_difficulty', $content['difficulty']['description']);
    }
    if (isset($content['difficulty']['id'])) {
      $node->set('field_recipe_difficulty_id', $content['difficulty']['id']);
    }
    $node->set('field_recipe_prepa_time', $content['prepTime']);
    $node->set('field_recipe_is_voiceready', $content['isVoiceReady']);
    $node->set('field_recipe_istraslated', $content['isRecipeTranslated']);

    /*
    /* Create new taxonomy term by every ingredient, if the taxonomy exists, only attach de ID.
    /**
    */
    if (!empty($content['ingredients'])) {
      foreach ($content['ingredients'] as $keyingredient => $ingredientsingle) {
        // Tips for ingredients
        $ingredientTips = [];
        if (!empty($ingredientsingle['tips'])) {
          $ingredientTips = Importer::createTips($ingredientsingle['tips']);
        }

        /*
        /* Check if the Taxonomy Term exists
        /**/
        if (!empty($ingredientsingle['name'])) {
          $ingredientsingle['name'] = trim($ingredientsingle['name'], '*');
          $query = Drupal::entityQuery('taxonomy_term');
          $query->condition('vid', "ingredients");
          $query->condition('name', $ingredientsingle['name']);
          $tids = $query->execute();
          // If not exists, we create it
          if (count($tids) == 0) {
            // Check if name is set and not empty. If not, save a log to track missing data.
            if (isset($ingredientsingle['name']) && !empty($ingredientsingle['name'])) {
              $term = Term::create([
                'vid' => 'ingredients',
                'name' => $ingredientsingle['name'],
                'field_ingredient_id' => $ingredientsingle['id'],
                'field_ingredient_is_nestle' => $ingredientsingle['isNestleProduct'],
              ]);
              $term->save();
            }
            else {
              Drupal::logger('SRH')->notice('Cannot save ingredient: ');
            }
            $currenting = [
              'target_id' => $term->id(),
            ];
          }
          else {
            // if exists, we store de target id
            foreach ($tids as $key => $value) {
              $currenting = [
                'target_id' => $value,
              ];
            }
          }
          // We create the ingredient entity, and attach them the taxonomy term
          $ingredient = Paragraph::create([
            'type' => 'recipe_ingredients',
            'field_ingredient_quantity_displa' => isset($ingredientsingle['quantity_display']) ? $ingredientsingle['quantity_display'] : '',
            'field_ingredient_name' => $ingredientsingle['name'],
            'field_ingredient_gtin' => $ingredientsingle['GTIN'],
            'field_ingredient_nutritonaldb_id' => $ingredientsingle['nutritionalDatabaseID'],
            'field_ingredient_isnestleproduct' => $ingredientsingle['isNestleProduct'],
            'field_ingredient_source' => $ingredientsingle['source'],
            'field_ingredient_preparationhint' => $ingredientsingle['preparationHint'],
            'field_ingredient_quantity' => $ingredientsingle['quantity'],
            'field_ingredient_quantitygrams' => $ingredientsingle['quantityGrams'],
            'field_ingredient_quantity_value' => $ingredientsingle['quantityFraction'],
            'field_ingredient_unittype_descri' => $ingredientsingle['unitType']['description'],
            'field_ingredient_unittype_plural' => $ingredientsingle['unitType']['pluralName'],
            'field_ingredient_unittype_singul' => $ingredientsingle['unitType']['singularName'],
            'field_ingredient_unit_abbrevsing' => $ingredientsingle['unitType']['singularAbbreviation'],
            'field_ingredient_unit_abbrevplur' => $ingredientsingle['unitType']['pluralAbbreviation'],
            'field_ingredient_unittype_id' => $ingredientsingle['unitType']['id'],
            'field_ingredient_yieldpercentage' => $ingredientsingle['yieldPercentage'],
            'field_ingredient_idingredient' => isset($ingredientsingle['idIngredient']) ? $ingredientsingle['idIngredient'] : '',
            'field_ingredient_quantity_total' => isset($ingredientsingle['quantityTotal']) ? $ingredientsingle['quantityTotal'] : '',
            'field_ingredient_autofullname' => isset($ingredientsingle['autoFullName']) ? $ingredientsingle['autoFullName'] : '',
            'field_ingredient_fullname' => isset($ingredientsingle['fullName']) ? $ingredientsingle['fullName'] : '',
            'field_ingredients_order' => isset($ingredientsingle['order']) ? $ingredientsingle['order'] : '',
            'field_ingredient_taxonomy' => $currenting,
            'field_ingredients_tips' => $ingredientTips,
          ]);

          Drupal::logger('SRH')
            ->notice('Ingredient :  ' . $ingredientsingle['idIngredient'] . ' name: ' . $ingredientsingle['name']);

          try {
            $ingredient->save();
          }
          catch (Exception $e) {
            Drupal::logger('SRH')
              ->notice('Cannot save ingredient: ' . $e->getMessage());
            return ('ok');
          }
          $ingset[$keyingredient] = [
            'target_id' => $ingredient->id(),
            'target_revision_id' => $ingredient->getRevisionId(),
          ];
        }
      }
      $node->set('field_recipe_ingredient', $ingset);
    }

    // Add Recipe tag in to the recipe while syncing.
    $allowed_taxonomy = [
      'cuisine',
      'course',
      'cuisine',
      'free_tag',
      'lifestyle',
      'meal',
      'nutritional',
      'occasion',
      'season',
    ];
    if (!empty($content['tags'])) {
      $all_recipe_tags = [];
      foreach ($content['tags'] as $tag_name => $term_name) {
        // Check if parent tags is exist and start keeping it child tags.
        $tags_id = [];
        if (!empty($tag_name)) {
          $vocab_name = str_replace(' ', '_', strtolower($tag_name));
          if (in_array($vocab_name, $allowed_taxonomy, TRUE)) {
            $vocabularies = Vocabulary::loadMultiple();
            // Check if vocabulary is exist or not.
            if (!isset($vocabularies[$vocab_name])) {
              $vocabulary = Vocabulary::create([
                'vid' => $vocab_name,
                'description' => '',
                'name' => $tag_name,
              ]);
              $vocabulary->save();
            }
            else {
              // If vocabulary is exist then map term.
              foreach ($term_name as $name) {
                $query = Drupal::entityQuery('taxonomy_term');
                $query->condition('vid', $vocab_name);
                $query->condition('field_recipe_tags_id', $name['id']);
                $tids = $query->execute();
                // Check if term is exist or not.
                if (count($tids) == 0 && !empty($tag_name)) {
                  $hierarchical_term = Term::create([
                    'vid' => $vocab_name,
                    'name' => $name['displayName'],
                    'description' => $name['description'],
                    'field_recipe_tags_id' => $name['id'],
                  ]);
                  $hierarchical_term->save();
                  $tags_id[] = $hierarchical_term->id();
                  $all_recipe_tags[] = $hierarchical_term->id();
                }
                else {
                  // Get term updated name and save with tid.
                  $tag_name_update = Term::load(key($tids));
                  $tag_name_update->name->setValue($name['displayName']);
                  $tag_name_update->Save();
                  $tags_id[] = key($tids);
                  $all_recipe_tags[] = key($tids);
                }
              }
            }
          }
        }
        // Set tag for each taxonomy and mapped with fields of tags.
        $node->set('field_recipe_tag_' . $vocab_name, $tags_id);
      }
      // Set recipes tags and hierarchical fields for all tags.
      $node->set('field_recipe_tags_hierarchical', array_unique($all_recipe_tags));
      $node->set('field_recipe_tags', array_unique($all_recipe_tags));
    }
    /*
    /* Create Steps entity and set relate them to Recipe - Media still
    missing and tools still missing
     */
    if (!empty($content['steps'])) {
      foreach ($content['steps'] as $keysteps => $stepsingle) {
        // Update steps of recipe with tools.
        $stepsIngredients = [];
        if (!empty($stepsingle['ingredients'])) {
          foreach ($stepsingle['ingredients'] as $ingr) {
            $stepsIngredients[] = Paragraph::create([
              'type' => 'recipe_ingredients',
              'field_ingredient_name' => $ingr['name'],
              'field_ingredient_idingredient' => $ingr['id'],
            ]);
          }
        }
        // Tools for ingredients
        $stepsTools = [];
        if (!empty($stepsingle['tools'])) {
          foreach ($stepsingle['tools'] as $tools) {
            $image = '';
            if (is_array($tools['media']) && count($tools['media']) >= 1) {
              foreach ($tools['media'] as $keytol => $imgtol) {
                if (!empty($imgtol['path'])) {
                  if (strlen($imgtol['path']) >= '5') {
                    $image = $imgtol['path'];
                  }
                }
              }
            }
            $stepsTools[] = Paragraph::create([
              'type' => 'recipe_tools',
              'field_tool_id' => $tools['id'],
              'field_tool_name' => $tools['name'],
              'field_tool_name_speechoutput' => $tools['name_speechOutput'],
              'field_para_tool_image' => isset($image) ? $image : '',
            ]);
          }
        }
        // Tips for ingredients
        $stepsTips = [];
        if (!empty($stepsingle['tips'])) {
          $stepsTips = Importer::createTips($stepsingle['tips']);
        }
        // StepsSpeech Output
        $output = Unicode::substr($stepsingle['text_speechOutput'], 0, 254);
        // Media for Steps.
        if (isset($stepsingle['medias'])) {
          $stepimages = [];
          foreach ($stepsingle['medias'] as $key => $media) {
            $step_videos = [];
            if ($media['idYoutube'] != NULL) {
              $step_videos[] = 'https://www.youtube.com/watch?v=' . $media['idYoutube'];
            }
            elseif (stripos($media['path'], 'youtube.com') !== FALSE) {
              $step_videos[] = $media['path'];
            }
            $stepimages[] = Paragraph::create([
              'type' => 'media_information',
              'field_media_info_path' => $media['path'],
              'field_media_info_media_purpose' => explode(',', $media['mediaPurposes'][0]),
              'field_media_info_description' => $media['description'],
              'field_media_info_locale' => $media['locale'],
              'field_media_info_resolution' => $media['resolution'],
              'field_media_info_mime_type' => $media['mimeType'],
              'field_media_info_width' => $media['width'],
              'field_media_info_height' => $media['height'],
              'field_media_info_thumbnail' => !empty($media['videoThumbnailUrl']) ? $media['videoThumbnailUrl'] : '',
              'field_media_video' => ($media['idYoutube'] != NULL) ? 'https://www.youtube.com/watch?v=' . $media['idYoutube'] : ((stripos($media['path'], 'youtube.com') !== FALSE) ? $media['path'] : ""),

            ]);
          }
        }
        $steps = Paragraph::create([
          'type' => 'recipe_steps',
          'field_steps_duration_minutes' => $stepsingle['duration'],
          'field_steps_id' => $stepsingle['id'],
          'field_steps_is_active' => $stepsingle['isActive'],
          'field_steps_number' => $stepsingle['number'],
          'field_steps_speechoutput' => $stepsingle['title_speechOutput'],
          'field_steps_steptype' => $stepsingle['stepType'],
          'field_steps_text' => $stepsingle['text'],
          'field_steps_text_speechoutput' => $output,
          'field_steps_title' => $stepsingle['title'],
          'field_steps_workload' => $stepsingle['workLoad'],
          'field_steps_image' => isset($stepimages) ? $stepimages : '',
          'field_steps_video' => isset($step_videos) ? $step_videos : [],
          'field_steps_ingredients' => $stepsIngredients,
          'field_steps_tools' => $stepsTools,
          'field_recipe_step_tips' => $stepsTips,
        ]);
        try {
          $steps->save();
        }
        catch (Exception $e) {
          Drupal::logger('SRH')
            ->notice('Cannot save steps: ' . $e->getMessage());
          return ('ok');
        }
        $currentsteps[$keysteps] = [
          'target_id' => $steps->id(),
          'target_revision_id' => $steps->getRevisionId(),
        ];
      }
      $node->set('field_recipe_steps', $currentsteps);
    }
    /*
    /* Create tools entities and set relate them to Recipe
     */
    if (!empty($content['tools'])) {
      foreach ($content['tools'] as $keytool => $toolsingle) {
        $image = '';
        if (is_array($toolsingle['media']) && count($toolsingle['media']) >= 1) {
          foreach ($toolsingle['media'] as $keytol => $imgtol) {
            if (!empty($imgtol['path'])) {
              if (strlen($imgtol['path']) >= '5') {
                $image = $imgtol['path'];
              }
            }
          }
        }
        $tools = Paragraph::create([
          'type' => 'recipe_tools',
          'field_tool_id' => $toolsingle['id'],
          'field_tool_name' => $toolsingle['name'],
          'field_tool_name_speechoutput' => $toolsingle['name_speechOutput'],
          'field_para_tool_image' => isset($image) ? $image : '',
        ]);
        try {
          $tools->save();
        }
        catch (Exception $e) {
          Drupal::logger('SRH')
            ->notice('Cannot save tools: ' . $e->getMessage());
          return ('ok');
        }
        $currenttool[$keytool] = [
          'target_id' => $tools->id(),
          'target_revision_id' => $tools->getRevisionId(),
        ];
      }
      $node->set('field_recipe_tools', $currenttool);
    }

    /**
     * Create generalTips entity and set relate them to Recipe.
     */
    if (!empty($content['generalTips'])) {
      foreach ($content['generalTips'] as $keytips => $tipssingle) {
        $stepsRecipeTips = [];
        if (!empty($tipssingle['title'])) {
          $image = [];
          if (is_array($tipssingle['media']) && count($tipssingle['media']) >= 1) {
            foreach ($tipssingle['media'] as $keytip => $imgtip) {
              if (!empty($imgtip['path'])) {
                if (strlen($imgtip['path']) >= '5') {
                  $image = $imgtip['path'];
                }
              }
            }
          }

          $paragraphData = [
            'type' => 'tips',
            'field_tips_description' => $tipssingle['description'],
            'field_description_speechoutput' => $tipssingle['description_speechOutput'],
            'field_tips_title' => $tipssingle['title'],
            'field_title_speech_output' => $tipssingle['title_speechOutput'],
            'field_tips_id' => $tipssingle['id'],
            'field_tips_order' => $tipssingle['order'],
          ];
          // if $image is not properly initialized pre-save issues are triggered if not properly checked
          if (!empty($image) && is_array($image)) {
            $paragraphData['field_tips_media'] = $image;
          }
          $stepsTips = Paragraph::create($paragraphData);
          try {
            $stepsTips->save();
          }
          catch (Exception $e) {
            Drupal::logger('SRH')
              ->notice('Cannot save stepsTips: ' . $e->getMessage());
            return ('ok');
          }
          $stepsRecipeTips[$keytips] = [
            'target_id' => $stepsTips->id(),
            'target_revision_id' => $stepsTips->getRevisionId(),
          ];

        }
      }
      // If general tips exist for recipe.
      if (is_array($stepsRecipeTips) && !empty($stepsRecipeTips)) {
        $node->set('field_general_tips', $stepsRecipeTips);
      }
    }
    /**
     * Create macroNutrients entity and set relate them to Recipe.
     */
    if (!empty($content['macroNutrients'])) {
      foreach ($content['macroNutrients'] as $keymac => $macsingle) {
        // Macro Nutrients Unit Type.
        $macro_unit_type = [];
        if (isset($macsingle['unitType']) && is_array($macsingle['unitType'])) {
          $macro_unit_type = Paragraph::create([
            'type' => 'srh_macronutrients_unittype',
            'field_ingredient_unittype_descri' => $macsingle['unitType']['description'],
            'field_ingredient_unittype_plural' => $macsingle['unitType']['pluralName'],
            'field_ingredient_unittype_singul' => $macsingle['unitType']['singularName'],
            'field_ingredient_unit_abbrevsing' => $macsingle['unitType']['singularAbbreviation'],
            'field_ingredient_unit_abbrevplur' => $macsingle['unitType']['pluralAbbreviation'],
            'field_ingredient_unittype_id' => $macsingle['unitType']['id'],
          ]);
        }
        // Macro Nutrients Units.
        $macroNutrients = Paragraph::create([
          'type' => 'macronutrients',
          'field_para_macro_unit' => $macsingle['unit'],
          'field_para_macro_quantity' => $macsingle['quantity'],
          'field_para_macro_display' => $macsingle['displayName'],
          'field_para_macro_name' => $macsingle['name'],
          'field_para_macro_id' => $macsingle['id'],
          'field_para_macro_type' => $macsingle['type'],
          'field_para_macro_unit_type' => isset($macro_unit_type) ? $macro_unit_type : '',
        ]);
        try {
          $macroNutrients->save();
        }
        catch (Exception $e) {
          Drupal::logger('SRH')
            ->notice('Cannot save macroNutrients: ' . $e->getMessage());
          return ('ok');
        }
        $macroCurrent[$keymac] = [
          'target_id' => $macroNutrients->id(),
          'target_revision_id' => $macroNutrients->getRevisionId(),
        ];
      }
      $node->set('field_recipe_macronutrients', $macroCurrent);

    }

    /* Recipe Recommendations */
    if (!empty($content['recommendations'])) {
      foreach ($content['recommendations'] as $type => $values) {
        $ids = [];
        foreach ($values as $key => $val) {
          $ids[] = $val['id'];
        }
        $node->set('field_recipe_rec_' . substr($type, 0, 15), $ids);
      }
    }

    /*
    /* Integrate media fields as a URL wrapper. Custom temaplte it's set to display it as an image
    /* TODO; Integrate the configuration fields to drupal Image styles
    */
    if (count($content['medias']) >= 1) {
      $videos = [];
      $images = [];
      foreach ($content['medias'] as $key => $media) {
        if ($media['idYoutube'] != NULL) {
          $videos[] = 'https://www.youtube.com/watch?v=' . $media['idYoutube'];
        }
        elseif (stripos($media['path'], 'youtube.com') !== FALSE) {
          $videos[] = $media['path'];
        }
        $images[] = Paragraph::create([
          'type' => 'media_information',
          'field_media_info_path' => $media['path'],
          'field_media_info_media_purpose' => isset($media['mediaPurposes'][0]) ? explode(',', $media['mediaPurposes'][0]) : '',
          'field_media_info_description' => $media['description'],
          'field_media_info_locale' => $media['locale'],
          'field_media_info_resolution' => $media['resolution'],
          'field_media_info_mime_type' => $media['mimeType'],
          'field_media_info_width' => $media['width'],
          'field_media_info_height' => $media['height'],
          'field_media_info_thumbnail' => !empty($media['videoThumbnailUrl']) ? $media['videoThumbnailUrl'] : '',
          'field_media_video' => ($media['idYoutube'] != NULL) ? 'https://www.youtube.com/watch?v=' . $media['idYoutube'] : ((stripos($media['path'], 'youtube.com') !== FALSE) ? $media['path'] : ""),
        ]);
      }
      // Check if images is set or not.
      if (isset($images) && !empty($images)) {
        $node->set('field_recipe_images', $images);
      }
      if (isset($videos)) {
        $node->set('field_recipe_video', $videos);
      }
    }

    $node->status = 1;
    try {
      $node->save();
    }
    catch (Exception $e) {
      Drupal::logger('SRH')
        ->notice('Cannot save node: ' . $e->getMessage());
      return ('ok');
    }
    return ('ok');
  }

  /**
   * @param $tips
   *
   * @return array
   */
  public static function get_recipe_variants($recipe_id) {
    $variants = [];
    $config = Drupal::service('config.factory')
      ->getEditable('dsu_srh.settings');
    $query = [
      'ciamnum' => $config->get('dsu_srh.dsu_connect_ciamnum'),
      'locale' => !empty($config->get('dsu_srh.dsu_connect_markets')) ? $config->get('dsu_srh.dsu_connect_markets') : $config->get('dsu_srh.dsu_connect_locales')[0]['connect_markets'],
      'market' => $config->get('dsu_srh.dsu_connect_market_code'),
      'http_errors' => FALSE,
      'sortBy' => 'updateDate',
      'sortType' => 'DESC',
    ];


    $url = $config->get('dsu_srh.dsu_connect_url');
    $apikey = $config->get('dsu_srh.dsu_connect_apikey');
    $client = new Client(['headers' => ['x-api-key' => $apikey]]);
    try {
      $response = $client->request('GET', $url . '/recipes/versions/' . $recipe_id, ['query' => $query], ['http_errors' => FALSE]);
      $code = $response->getStatusCode(); // 200
      $reason = $response->getReasonPhrase(); // OK
      $content = JSON::decode($response->getBody()->getContents());
      if ($code == '200') {
        if (is_array($content) && isset($content)) {
          foreach ($content as $key => $versions) {
            if (isset($versions)) {
              $versions = Paragraph::create([
                'type' => 'recipe_variants',
                'field_variant_recipe_id' => $versions['idrecipe'],
                'field_variants_recipe_title' => $versions['title'],
                'field_variant_type' => $versions['versiontype'],
                'field_variant_recipe_version_id' => $versions['idversiontype'],
              ]);
              $versions->save();
              $variants[] = [
                'target_id' => $versions->id(),
                'target_revision_id' => $versions->getRevisionId(),
              ];
            }
          }
        }
      }
    }
    catch (\Exception $error) {
      $logger = \Drupal::logger('SRH');
      $logger->notice('HTTP Client error: ' . $error->getMessage());
    }

    return $variants;
  }

  /**
   * @param $tips
   *
   * @return array
   */
  public static function createTips($tips) {
    // Tips for ingredients
    $stepsTips = [];
    if (!empty($tips)) {
      foreach ($tips as $tips) {
        $image = [];
        if (is_array($tips['media']) && count($tips['media']) >= 1) {
          foreach ($tips['media'] as $keytip => $imgtip) {
            if (!empty($imgtip['path'])) {
              if (strlen($imgtip['path']) >= '5') {
                $image = $imgtip['path'];
              }
            }
          }
        }
        $paragraphData = [
          'type' => 'tips',
          'field_tips_description' => $tips['description'],
          'field_description_speechoutput' => $tips['description_speechOutput'],
          'field_tips_title' => $tips['title'],
          'field_title_speech_output' => $tips['title_speechOutput'],
          'field_tips_id' => $tips['id'],
          'field_tips_order' => $tips['order'],
        ];
        // if $image is not properly initialized pre-save issues are triggered if not properly checked
        if (!empty($image) && is_array($image)) {
          $paragraphData['field_tips_media'] = $image;
        }
        $stepsTips[] = Paragraph::create($paragraphData);
      }
      return $stepsTips;
    }
  }

  /*
   * Disable indexing and save indexing history with index_key.
   * $variable to disable or enable indexing.
   */
  public static function toggleSearchIndexingServer($status) {
    // Get default config from settings file.
    $config = Drupal::service('config.factory')
      ->getEditable('dsu_srh.settings');

    // Get indexing for existing database server.
    $moduleService = \Drupal::service('module_handler');
    if ($moduleService->moduleExists('search_api')) {
      $indexList = Index::loadMultiple();

      // Set and enable for indexing options.
      if ($status) {
        // Check if indexing server having list of index id.
        $indexing_server = $config->get('dsu_srh.dsu_single_indexing_server');
        $indexHistory = json_decode($indexing_server);
        if (!empty($indexHistory)) {
          foreach ($indexList as $index) {
            if (in_array($index->id(), $indexHistory)) {
              $index->setOption('index_directly', $status);
              $index->save();
            }
          }
        }
      }
      // Disable and keep history of indexing server for indexing options.
      elseif ($status === FALSE) {
        $indexList = Index::loadMultiple();
        foreach ($indexList as $index) {
          if ($index->getOption('index_directly')) {
            $indexHistory[] = $index->id();
            $index->setOption('index_directly', $status);
            $index->save();
          }
        }

        // Set if variable is exist.
        if (!empty($indexHistory) && isset($indexHistory)) {
          $config->set('dsu_srh.dsu_single_indexing_server', json_encode(array_unique($indexHistory)))
            ->save();
        }
      }
    }
  }


  /*
   * SAVE RECIPE, Store locally the the received recipe.
   * $content it's a full recipe values.
   */
  public function getAllId() {
    $groups = [];
    $config = $this->configFactory->getEditable('dsu_srh.settings');
    /**
     * Configuring the query call for every Brand configured
     */

    $brands = $config->get('dsu_srh.dsu_connect_brands');
    $brandsArray = explode(',', $brands);
    if ($brands == '') {
      $complexQuery = '';
    }
    else {
      $complexQuery = 'recipes@brand:';
      foreach ($brandsArray as $brakey => $brand) {
        $brand = ltrim($brand);
        $complexQuery = $complexQuery . $brand;
        end($brandsArray);
        if ($brakey === key($brandsArray)) {
        }
        else {
          $complexQuery = $complexQuery . ' OR brand:';
        }
      }
    }
    /*
     *  Configuring the query call for every Market configured
     */
    $locales = $config->get('dsu_srh.dsu_connect_locales');
    foreach ($locales as $key => $value) {
      $markets[] = $value['connect_markets'];
    }

    // Get recipes update type with time.
    $complex_query_time = '';
    $recipe_update_type = $config->get('dsu_srh.dsu_connect_last_update_type');

    // Choose query based on query type.
    switch ($recipe_update_type) {
      case 'last_updated':
        $complex_query_time = 'recipes@updateDate>=' . $config->get('dsu_srh.dsu_connect_last_update') . '';
        break;
      case 'yesterday_updated':
        $last_updated = date('Ymd', strtotime('-1 day', strtotime($config->get('dsu_srh.dsu_connect_last_update'))));
        $complex_query_time = 'recipes@updateDate>=' . $last_updated . '';
        break;
      case 'last_week':
        $last_updated = date('Ymd', strtotime('-7 day', strtotime($config->get('dsu_srh.dsu_connect_last_update'))));
        $complex_query_time = 'recipes@updateDate>=' . $last_updated . '';
        break;
      case 'full_sync':
        $complex_query_time = '';
        break;
      case 'single_recipe':
        $recipe_id = $config->get('dsu_srh.dsu_single_recipes_import');
        $complex_query_time = 'recipes@id:' . $recipe_id . '';
        break;
      case 'one_day_before':
        $last_updated = date('Ymd', strtotime('-1 day', time()));
        $complex_query_time = 'recipes@updateDate>=' . $last_updated . '';
        break;

    }
    /*
     * Set default values of the search query
     */
    $query = [
      'ciamnum' => $config->get('dsu_srh.dsu_connect_ciamnum'),
      'q' => '',
      'numRows' => '1',
      'start' => '0',
      'sortBy' => 'updateDate',
      'sortType' => 'DESC',
      'locale' => !empty($config->get('dsu_srh.dsu_connect_markets')) ? $config->get('dsu_srh.dsu_connect_markets') : $config->get('dsu_srh.dsu_connect_locales')[0]['connect_markets'],
      'market' => $config->get('dsu_srh.dsu_connect_market_code'),
      empty($complex_query_time) ? '' : 'complexQuery' => $complex_query_time,
    ];

    // Filter array keys with removing blank keys.
    $query = array_filter($query);

    $url = $config->get('dsu_srh.dsu_connect_url');
    $apikey = $config->get('dsu_srh.dsu_connect_apikey');
    $client = new Client(['headers' => ['x-api-key' => $apikey]]);
    /*
     * Perform call for every market
     */
    foreach ($locales as $market) {
      $query['locale'] = $market['connect_markets'];
      /**
       * Performing a preflight call to know the total number of recipes in the market by the configured brands
       */
      $response = $client->request('GET', $url . '/search', ['query' => $query]);
      $content = $this->serialization->decode(($response->getBody()
        ->getContents()));
      $id = [];
      /**
       * Performing the call to know the IDs of the recipes
       */
      $numberRecipes = $content['recipes']['numResults'];
      $query['start'] = 0;
      $exit = 0;
      do {
        $query['numRows'] = 100; // We call 1000 every time, first time start = 0
        $response = $client->request('GET', $url . '/search', ['query' => $query]);
        try {
          $content = $this->serialization->decode(($response->getBody()
            ->getContents()));
          foreach ($content['recipes']['items'] as $key => $recipie) {
            $id[] = $recipie['id'];
          }
        }
        catch (RequestException $e) {
          Drupal::logger('SRH')
            ->notice('Exception with message:  ' . $e->getMessage());
          $message = t('Service not available, contact to admin');
        }

        if (($query['start'] + $query['numRows']) < $content['recipes']['numResults']) {
          $query['start'] = $query['start'] + 100;
          $numberRecipes = $numberRecipes - 100;
        }
        else {
          $exit = 1;
        }

      } while ($exit == 0);
      // ------ ***** ------
      $grouprecipes = array_chunk($id, $config->get('dsu_srh.dsu_connect_amount'));
      foreach ($grouprecipes as $key => $group) {
        $groups[] = ['values' => $group, 'market' => $market];
      }
    }

    return $groups;
  }

}
