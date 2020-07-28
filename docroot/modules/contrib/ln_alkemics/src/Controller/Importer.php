<?php
/**
 * @file
 * Contains \Drupal\ln_alkemics\Controller\Importer
 */

namespace Drupal\ln_alkemics\Controller;

use Drupal;
use Drupal\Component\Serialization\Json;
use Drupal\Core\Config\ConfigFactory;
use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
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

  public function getAlkemicsTokenAuth() {
    // Checking endpoint details with client token.
    $config = \Drupal::config('ln_alkemics.settings');
    $endpoint = $config->get('ln_alkemics.alkemics_api_endpoint_token_url');
    $client_id = $config->get('ln_alkemics.alkemics_api_client_id');
    $client_secret = $config->get('ln_alkemics.alkemics_api_client_secret');

    // Initialize client request.
    $httpClient = new Client();
    try {
      // Send request.
      $response = $httpClient->request('POST', $endpoint, [
        'body' => '{
        "client_secret": "' . $client_secret . '",
        "client_id": "' . $client_id . '",
        "grant_type": "client_credentials"
      }',
        'http_errors' => TRUE,
        'headers' => [
          'Content-Type' => 'application/json',
        ],
      ]);
      // Get response and body.
      $code = $response->getStatusCode(); // 200
      $content = JSON::decode($response->getBody()->getContents());
      if ($code == '200') {
        \Drupal::messenger()
          ->addStatus('Alkemics Tokens authentication connected successfully.');
      }
    }
    catch (RequestException $e) {
      if ($e->getCode() == '403') {
        \Drupal::messenger()->addError('Exception Error on requesting data.');
      }
      else {
        \Drupal::messenger()->addError('Networking error, check the URL.');
      }
    }
    return isset($content) ? $content : '';
  }


  /*
 * Main IMPORTATION Function.
 * This function receive an array $values = array('values' => [the ids], 'market' => [market info])
 * This function call Alkemics with the market information, and gets one by one the specified recipes
 * Check if a recipe has to be imported, updates or unpublished following the main configuration
 */

  public function syncroProducts($product) {
    // Get product unique ID.
    if (is_array($product)) {
      $ids = $product['gtin'];
    }
    else {
      $ids = [$product['gtin']];
    }

    /*
    / For each result we check if exists, if needs to update or if needs to be unpublished
    */
    if (isset($product['gtin'])) {
      // Get Nid if recipe is exist or not.
      $entity_ids = \Drupal::entityQuery('node')
        ->condition('type', 'dsu_product')
        ->condition('field_al_gtin', $ids)
        ->execute();
      $node_exists = Node::load($entity_ids [key($entity_ids)]);
      $updateDate = strtotime($product['updatedAt']);
      if ($node_exists == NULL) {
        // The Recipe doesn't exists locally. Importing it.
        $status = Importer::saveProduct($product, $node_exists);
      }
      else {
        $status = Importer::saveProduct($product, $node_exists);
        $node_exists->save();
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
  public function saveProduct($data, $node = NULL) {
    $langcode = Drupal::languageManager()->getCurrentLanguage()->getId();
    // Check for old nodes.
    if (is_object($node) && isset($node)) {

    }
    elseif ($node == NULL) {
      /* Generating node entity, and setting the content from the recipe*/
      $node = Node::create(['type' => 'dsu_product']);
      $node->enforceIsNew();
    }

    // Get synonyms.
    if (isset($data['synonyms'])) {
      foreach ($data['synonyms'] as $synonym) {
        $synonyms[] = $synonym['text']['0']['data'];
      }
    }
    // Get health Allegations.
    if (isset($data['healthAllegations'])) {
      foreach ($data['healthAllegations'] as $healthAllegation) {
        $healthAllegations[] = $healthAllegation['text']['0']['data'];
      }
    }
    // Get target consumer age.
    if (isset($data['targetConsumerAgeTextList'])) {
      foreach ($data['targetConsumerAgeTextList'][0] as $consumerAge) {
        $consumerAges[] = $consumerAge[0]['data'];
      }
    }
    // Get target consumer gender list.
    if (isset($data['targetConsumerGenderList'])) {
      foreach ($data['targetConsumerGenderList'] as $consumerGender) {
        $consumerGenders[] = $consumerGender['targetConsumerGenderCode']['label'];
      }
    }
    // Get product flavors.
    if (isset($data['flavors'])) {
      foreach ($data['flavors'] as $flavor) {
        $coffeeflavor[] = $flavor['flavor']['label'];
      }
    }
    // Get food and beverage ingredients.
    if (isset($data['foodAndBeverageIngredientDescriptionList'])) {
      foreach ($data['foodAndBeverageIngredientDescriptionList'] as $ingredient) {
        $ingredients[] = $ingredient['ingredientNameText'][0]['data'];
      }
    }
    // Get number of servings pre package.
    if (isset($data['numberOfServingsPerPackageList'])) {
      foreach ($data['numberOfServingsPerPackageList'] as $numberOfServing) {
        $numberOfServings[] = $numberOfServing['measurementPrecisionOfNumberOfServingsPerPackageCode']['label'] . ': ' . $numberOfServing['numberOfServingsPerPackageNumber'];
      }
    }
    $node->set('title', isset($data['namePublicShort'][0]['data']) ? $data['namePublicShort'][0]['data'] : 'No Title');
    $node->set('path', '/product/' . $data['gtin']);
    $node->set('langcode', $langcode);
    $node->set('changed', strtotime($data['updatedAt']));
    $node->set('field_dsu_product_desc', $data['namePublicLong'][0]['data']);
    $node->set('field_product_image', 1398);
    $node->set('field_al_gtin', $data['gtin']);
    $node->set('field_al_supplier_code', $data['supplierCode']);
    $node->set('field_al_sub_brand_text', $data['subBrandText']);
    $node->set('field_al_name_public_long', $data['namePublicLong'][0]['data']);
    $node->set('field_al_name_public_short', $data['namePublicShort'][0]['data']);
    $node->set('field_al_product_benefits', $data['productBenefits'][0]['text'][0]['data']);
    $node->set('field_al_nutrients', $data['nutrients']);
    $node->set('field_al_allergens', $data['allergens']['0']['data']);
    $node->set('field_al_coffee_range', $data['coffeeRangeText'][0]['data']);
    $node->set('field_al_coffee_format', $data['coffeeFormatCode']['label']);
    $node->set('field_al_good_to_know', $data['goodToKnow'][0]['data']);
    $node->set('field_al_good_question', $data['goodQuestion'][0]['data']);
    $node->set('field_al_good_to_remember', $data['goodToRemember'][0]['data']);
    $node->set('field_al_coffee_variety', $coffeeflavor);
    $node->set('field_al_health_allegations', $healthAllegations);
    $node->set('field_al_keywords', $synonyms);
    $node->set('field_al_consumer_age', $consumerAges);
    $node->set('field_al_consumer_gender', $consumerGenders);
    $node->set('field_al_number_of_servings', $numberOfServings);
    // $node->set('field_al_pictures_f', $fileset);
    // $node->set('field_al_ingredients_l', $ingredients);
    try {
      $node->save();
    }
    catch (Exception $e) {
      Drupal::logger('Importer')
        ->notice('Cannot save node: ' . $e->getMessage());
      return ('ok');
    }

  }


  /**
   * @param $token
   *
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  public
  function getAllId($token) {
    // Checking endpoint details with client token.
    $config = \Drupal::config('ln_alkemics.settings');
    $product_endpoint = $config->get('ln_alkemics.alkemics_api_endpoint_url');

    // Get market GTIN and code filter query.
    $gtin = !empty($config->get('ln_alkemics.alkemics_api_market_gtin')) ? $config->get('ln_alkemics.alkemics_api_market_gtin') : FALSE;;
    $market = !empty($config->get('ln_alkemics.alkemics_api_target_market_id')) ? $config->get('ln_alkemics.alkemics_api_target_market_id') : FALSE;
    if ((is_numeric($gtin)) OR !empty($market)) {
      $product_endpoint .= '?filter_target_market=' . $market;;
    }

    // Endpoints header.
    $options = [
      'method' => 'GET',
      'http_errors' => TRUE,
      'headers' => [
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer ' . $token['access_token'],
      ],
    ];

    // Initialize client request.
    $httpClient = new Client();
    try {
      // Send request.
      $response = $httpClient->request('GET', $product_endpoint, $options);
      // Get response and body.
      $code = $response->getStatusCode(); // 200
      $content = JSON::decode($response->getBody()->getContents());
      if ($code == '200') {
        foreach ($content['data'] as $key => $value) {
          $product_data[] = ['gtin' => $value['gtin'], 'product' => $value];
        }
      }
    }
      // Handle exception with log in db.
    catch (RequestException $e) {
      Drupal::logger('Importer')
        ->notice('Exception with message:  ' . $e->getMessage());
      $message = t('Service not available, contact to admin');
    }
    return isset($product_data) ? $product_data : '';
  }

}
