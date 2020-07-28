<?php

/**
 * @file
 * Contains \Drupal\dsu_srh\Form\ConnectForm.
 */

namespace Drupal\dsu_srh\Form;


use Drupal;
use Drupal\Component\Serialization\Json;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Language\Language;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class ConnectForm extends ConfigFormBase {

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   */
  function localeAjaxExampleAddMoreRemove(array &$form, FormStateInterface $form_state) {
    // Get the triggering item
    $delta_remove = $form_state->getTriggeringElement()['#parents'][1];

    // Store our form state
    $field_deltas_array = $form_state->get('field_locales');

    // Find the key of the item we need to remove
    $key_to_remove = array_search($delta_remove, $field_deltas_array);

    // Remove our triggered element
    unset($field_deltas_array[$key_to_remove]);

    // Rebuild the field deltas values
    $form_state->set('field_locales', $field_deltas_array);

    // Rebuild the form
    $form_state->setRebuild();

    // Return any messages set
    drupal_get_messages();
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return mixed
   */
  function localeAjaxExampleAddMoreRemoveCallback(array &$form, FormStateInterface $form_state) {
    return $form['server_conf']['locales'];
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   */
  function localeAjaxExampleAddMoreAddOne(array &$form, FormStateInterface $form_state) {

    // Store our form state
    $field_deltas_array = $form_state->get('field_locales');

    // check to see if there is more than one item in our array
    if (count($field_deltas_array) > 0) {
      // Add a new element to our array and set it to our highest value plus one
      $field_deltas_array[] = max($field_deltas_array) + 1;
    }
    else {
      // Set the new array element to 0
      $field_deltas_array[] = 0;
    }
    // Rebuild the field deltas values
    $form_state->set('field_locales', $field_deltas_array);

    // Rebuild the form
    $form_state->setRebuild();

    // Return any messages set
    drupal_get_messages();
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return mixed
   */
  function localeAjaxExampleAddMoreAddOneCallback(array &$form, FormStateInterface $form_state) {
    return $form['server_conf']['locales'];
  }


  function tagsAjaxExampleAddMoreRemove(array &$form, FormStateInterface $form_state) {
    // Get the triggering item
    $delta_remove = $form_state->getTriggeringElement()['#parents'][1];

    // Store our form state
    $field_deltas_array = $form_state->get('field_tags');

    // Find the key of the item we need to remove
    $key_to_remove = array_search($delta_remove, $field_deltas_array);

    // Remove our triggered element
    unset($field_deltas_array[$key_to_remove]);

    // Rebuild the field deltas values
    $form_state->set('field_tags', $field_deltas_array);

    // Rebuild the form
    $form_state->setRebuild();

    // Return any messages set
    drupal_get_messages();
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return mixed
   */
  function tagsAjaxExampleAddMoreRemoveCallback(array &$form, FormStateInterface $form_state) {
    return $form['search']['connect_tags_mul'];
  }

  /* DISCLAIMER:
  /* AJAX COMPLEMENTARI FUNCTION
  */

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   */
  function tagsAjaxExampleAddMoreAddOne(array &$form, FormStateInterface $form_state) {

    // Store our form state
    $field_deltas_array = $form_state->get('field_tags');

    // check to see if there is more than one item in our array
    if (count($field_deltas_array) > 0) {
      // Add a new element to our array and set it to our highest value plus one
      $field_deltas_array[] = max($field_deltas_array) + 1;
    }
    else {
      // Set the new array element to 0
      $field_deltas_array[] = 0;
    }
    // Rebuild the field deltas values
    $form_state->set('field_tags', $field_deltas_array);

    // Rebuild the form
    $form_state->setRebuild();

    // Return any messages set
    drupal_get_messages();
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return mixed
   */
  function tagsAjaxExampleAddMoreAddOneCallback(array &$form, FormStateInterface $form_state) {
    return $form['search']['connect_tags_mul'];
  }

  /**
   * Gets the configuration names that will be editable.
   *
   * @return array
   *   An array of configuration object names that are editable if called in
   *   conjunction with the trait's config() method.
   */
  protected function getEditableConfigNames() {
    return [
      'dsu_srh.settings',
    ];
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return array
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    // Form initialization
    $form = parent::buildForm($form, $form_state);
    $config = $this->config('dsu_srh.settings');
    // Get the locales that user has set up
    $locales = $config->get('dsu_srh.dsu_connect_locales');
    if ($locales == '') {
      //Init array to avoid Warnings
      $locales = ['0' => ['connect_markets' => '', 'langcode' => '']];
    }
    // Get the tags that user has set up
    $tags = $config->get('dsu_srh.dsu_connect_tagsmul');
    if ($tags == '') {
      //Init array to avoid Warnings
      $tags = [
        '0' => ['titleTags' => '', 'fieldTags' => ''],
        '1' => ['titleTags' => '', 'fieldTags' => ''],
      ];
    }

    // Server call configuration
    $form['server_conf'] = [
      '#type' => 'fieldset',
      '#title' => t('Configure the server call to Smart Recipe Hub'),
      '#collapsible' => TRUE,
      '#collapsed' => FALSE,
    ];
    $form['server_conf']['connect_URL'] = [
      '#type' => 'textfield',
      '#title' => $this->t('URL'),
      '#description' => $this->t('Set the URL of the SRH, also set version -> URL/VERSION'),
      '#default_value' => $config->get('dsu_srh.dsu_connect_url'),
      '#required' => TRUE,
    ];

    $form['server_conf']['connect_ciamnum'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Ciamnum'),
      '#description' => $this->t('Set the Ciamnum'),
      '#default_value' => $config->get('dsu_srh.dsu_connect_ciamnum'),
      '#required' => TRUE,
    ];

    $form['server_conf']['locales'] = [
      '#title' => 'Configure the lenguages of the connector',
      '#type' => 'fieldset',
      '#weight' => 80,
      '#tree' => TRUE,
      // Set up the wrapper so that AJAX will be able to replace the fieldset.
      '#prefix' => '<div id="js-ajax-elements-wrapper-locale"> ',
      '#suffix' => '</div> ',
      '#description' => $this->t('Allow to syncronize diferents lenguages'),
    ];
    if ($form_state->get('field_locales') == '') {
      $form_state->set('field_locales', range(0, count($locales) - 1));
    }

    $field_count_locales = $form_state->get('field_locales');

    foreach ($field_count_locales as $key => $delta) {

      $form['server_conf']['locales'][$delta] = [
        '#type' => 'container',
        '#attributes' => [
          'class' => ['container-inline'],
        ],
        '#tree' => TRUE,
      ];

      $form['server_conf']['locales'][$delta]['connect_markets'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Set Market'),
        '#description' => $this->t('Set the Market Code'),
        '#default_value' => $locales[$key]['connect_markets'],
        '#required' => FALSE,
      ];

      $form['server_conf']['locales'][$delta]['langcode'] = [
        '#title' => $this->t('Language'),
        '#type' => 'language_select',
        '#languages' => Language::STATE_ALL,
        '#default_value' => $locales[$key]['langcode'],
      ];
      $form['server_conf']['locales'][$delta]['remove_locale'] = [
        '#type' => 'submit',
        '#value' => t('-'),
        '#submit' => ['::localeAjaxExampleAddMoreRemove'],
        '#ajax' => [
          'callback' => '::localeAjaxExampleAddMoreRemoveCallback',
          'wrapper' => 'js-ajax-elements-wrapper-locale',
        ],
        '#weight' => -50,
        '#attributes' => [
          'class' => ['button-small'],
        ],
        '#name' => 'remove_name_' . $delta,
      ];
    }
    $form['server_conf']['locales']['add_locale'] = [
      '#type' => 'submit',
      '#value' => t('Add more languages'),
      '#submit' => ['::localeAjaxExampleAddMoreAddOne'],
      '#ajax' => [
        'callback' => '::localeAjaxExampleAddMoreAddOneCallback',
        'wrapper' => 'js-ajax-elements-wrapper-locale',
      ],
      '#weight' => 410,
    ];
    $form['server_conf']['connect_apikey'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Api Key'),
      '#description' => $this->t('Set the API KEY'),
      '#default_value' => $config->get('dsu_srh.dsu_connect_apikey'),
      '#required' => TRUE,
    ];

    $form['server_conf']['connect_brands'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Brands'),
      '#description' => $this->t('Set the brands name, comma separated. Be aware, the brand name has to be the exact name, Maggi or Maggi® are not the same'),
      '#attributes' => ['placeholder' => $this->t('For exemple: Maggi®, Carnation® Clavel®')],
      '#default_value' => $config->get('dsu_srh.dsu_connect_brands'),
      '#required' => FALSE,
    ];

    $form['server_conf']['connect_market_code'] = [
      '#type' => 'textfield',
      '#title' => $this->t('SRH Market Code'),
      '#description' => $this->t('Set SRH Market code'),
      '#default_value' => $config->get('dsu_srh.dsu_connect_market_code'),
      '#required' => TRUE,
    ];

    $form['sync_conf'] = [
      '#type' => 'fieldset',
      '#title' => t('Configure synchronization process in your website'),
      '#collapsible' => TRUE,
      '#collapsed' => FALSE,
    ];

    $form['sync_conf']['connect_amount'] = [
      '#type' => 'range',
      '#title' => $this
        ->t('Amount of recipes package to import (performance feature)'),
      '#max' => 50,
      '#min' => 5,
      '#step' => 5,
      '#default_value' => $config->get('dsu_srh.dsu_connect_amount'),
      '#description' => $this->t('Minimum 5, maximum 50 request by package. Currently:' . $config->get('dsu_srh.dsu_connect_amount') . ' request by package '),
    ];
    $form['sync_conf']['connect_periodic'] = [
      '#type' => 'checkbox',
      '#title' => t('Turn on the schedule synchronization'),
      '#description' => $this->t('Be Aware! When using for the first time, process may hang up due to memory shortage. Check you server configuration to avoid PHP limits'),
      '#return_value' => TRUE,
      '#default_value' => $config->get('dsu_srh.dsu_connect_periodic'),

    ];

    $updated_recipes = [
      'last_updated' => 'Last updated',
      'yesterday_updated' => 'Yesterday updated',
      'last_week' => 'Last week',
      'full_sync' => 'Full sync',
      'one_day_before' => 'One Day Before',
    ];

    $form['sync_conf']['cron_last_updated_type'] = [
      '#title' => 'Cron Sync Type',
      '#type' => 'select',
      '#options' => $updated_recipes,
      '#description' => $this->t('Get Recipes and updates based on time durations.'),
      '#default_value' => $config->get('dsu_srh.dsu_connect_cron_sync_update_type'),
      '#required' => TRUE,
    ];

    $form['sync_conf']['connect_interval_cron'] = [
      '#type' => 'select',
      '#title' => $this
        ->t('Set the interval time to Synchronize recipes with the Smart Recipe Hub'),
      '#options' => [
        '10800' => $this->t('Every 3 hours'),
        '43200' => $this->t('Every 12 hours'),
        '86400' => $this->t('Every day'),
        '172800' => $this->t('Every 2 days'),
        '259200' => $this->t('Every 3 days'),
        '432000' => $this->t('Every 5 days'),
        '604800' => $this->t('Every 7 days'),
        '1296000' => $this->t('Every 15 days'),
        '2592000' => $this->t('Every 30 days'),
      ],
      '#default_value' => $config->get('dsu_srh.dsu_connect_interval'),
      '#description' => $this->t('Interval value indicates the period in which synchronization process is enqueued in drupal cron jobs'),
    ];
    $form['sync_conf']['connect_isnew'] = [
      '#type' => 'select',
      '#title' => $this
        ->t('Sets the interval when recipes are marked with the "New" tag'),
      '#options' => [
        '86400' => $this->t('1 day'),
        '432000' => $this->t('5 days'),
        '604800' => $this->t('7 days'),
        '1296000' => $this->t('15 days'),
        '2592000' => $this->t('30 days'),
        '7776000' => $this->t('90 days'),
      ],
      '#default_value' => $config->get('dsu_srh.dsu_connect_isnew'),
      '#description' => $this->t('Recipes will be updated during synchronization process, or when the search widget is used. Set a number period greater than Cron synchronization to properly make use of this feature'),
    ];

    $form['search'] = [
      '#title' => 'Test your search configuration',
      '#type' => 'fieldset',
      '#weight' => 80,
    ];
    $form['search']['display'] = [
      '#title' => 'Configure the display of the search feature',
      '#type' => 'fieldset',
      '#weight' => 78,
    ];
    $form['search']['display']['connect_quantity'] = [
      '#type' => 'number',
      '#title' => $this
        ->t('Number of recipes to show'),
      '#default_value' => $config->get('dsu_srh.dsu_connect_quantity'),
    ];
    $form['search']['collections']['connect_collection'] = [
      '#type' => 'textfield',
      '#title' => t('Collections, coma separated '),
      '#size' => 40,
      '#default_value' => $config->get('dsu_srh.dsu_connect_collection'),
      '#description' => $this->t('Set every collection comma separated ( collection1, collection2, ... )'),
    ];


    $form['search']['collections'] = [
      '#title' => 'Check if Collection have results in your markets',
      '#type' => 'fieldset',
      '#weight' => 78,
      '#description' => $this->t('Remind, then you have to set up this configuration in every search block'),
    ];

    $form['search']['collections']['connect_collection'] = [
      '#type' => 'textfield',
      '#title' => t('Collections, coma separated '),
      '#size' => 40,
      '#default_value' => $config->get('dsu_srh.dsu_connect_collection'),
      '#description' => $this->t('Set every collection coma separated ( collection1, collection2, ... )'),
    ];

    $form['search']['connect_tags_mul'] = [
      '#title' => 'Check if Tags have results in your markets',
      '#type' => 'fieldset',
      '#weight' => 80,
      '#tree' => TRUE,
      // Set up the wrapper so that AJAX will be able to replace the fieldset.
      '#prefix' => '<div id="js-ajax-elements-wrapper-tags"> ',
      '#suffix' => '</div> ',
      '#description' => $this->t('Remind, then you have to set up this configuration in every search block'),
    ];

    if ($form_state->get('field_tags') == '') {
      $form_state->set('field_tags', range(0, count($tags) - 2));
    }

    $field_count_tags = $form_state->get('field_tags');


    foreach ($field_count_tags as $key => $delta) {


      $form['search']['connect_tags_mul'][$delta] = [
        '#type' => 'container',
        '#attributes' => [
          'class' => ['container-inline'],
        ],
        '#tree' => TRUE,
      ];

      $form['search']['connect_tags_mul'][$delta]['titleTags'] = [
        '#type' => 'textfield',
        '#title' => t('Tag Group '),
        '#size' => 10,
        '#default_value' => $tags[$key]['titleTags'],
      ];

      $form['search']['connect_tags_mul'][$delta]['fieldTags'] = [
        '#type' => 'textfield',
        '#title' => t('Tags, comma separated '),
        '#size' => 40,
        '#default_value' => $tags[$key]['fieldTags'],
      ];
      $form['search']['connect_tags_mul'][$delta]['remove_name'] = [
        '#type' => 'submit',
        '#value' => t('-'),
        '#submit' => ['::tagsAjaxExampleAddMoreRemove'],
        '#ajax' => [
          'callback' => '::tagsAjaxExampleAddMoreRemoveCallback',
          'wrapper' => 'js-ajax-elements-wrapper-tags',
        ],
        '#weight' => -50,
        '#attributes' => [
          'class' => ['button-small'],
        ],
        '#name' => 'remove_name_' . $delta,
      ];
    }
    $form['search']['connect_tags_mul']['add_name'] = [
      '#type' => 'submit',
      '#value' => t('Add one more tags'),
      '#submit' => ['::tagsAjaxExampleAddMoreAddOne'],
      '#ajax' => [
        'callback' => '::tagsAjaxExampleAddMoreAddOneCallback',
        'wrapper' => 'js-ajax-elements-wrapper-tags',
      ],
      '#weight' => 410,
    ];


    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#title' => $this->t('Test and Save'),
      '#value' => t('Test and Save'),
    ];

    return $form;

  }

  /** TAGS FUNCTION
   */
  /*
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   */
  /**
   * Returns a unique string identifying the form.
   *
   * @return string
   *   The unique string identifying the form.
   */
  public function getFormId() {
    return 'dsu_srh_form';
  }

  public function validateForm(array &$form, FormStateInterface $form_state) {


    /* if ( empty($this->getValue($form_state, 'connect_quantity')) || $this->getValue($form_state, 'connect_quantity') <= '0') {
       $form_state->setErrorByName('connect_quantity', $this->t('The number of recipes has to be higher than 0'));
     }
 */
    // Gestting the market values
    $locales = $form_state->getValue('locales');
    unset($locales['add_locale']);
    if (!empty($locales)) {
      foreach ($locales as $key => $value) {
        if ($value['connect_markets'] != '') {
          $markets[] = $value['connect_markets'];
        }
      }
    }
    if (!isset($markets)) {
      $form_state->setErrorByName('locales', t('Missing Market'));

      return;
    }

    foreach ($markets as $market) {
      $query = [
        'q' => '',
        'numRows' => '1',
        'start' => '0',
        'sortBy' => 'updateDate',
        'sortType' => 'DESC',
        'ciamnum' => $this->getValue($form_state, 'connect_ciamnum'),
        'locale' => $market,
        'market' => $this->getValue($form_state, 'connect_market_code'),
      ];
      $url = $this->getValue($form_state, 'connect_URL');
      $apikey = $this->getValue($form_state, 'connect_apikey');
      $client = new Client(['headers' => ['x-api-key' => $apikey]]);
      try {
        $response = $client->request('GET', $url . '/search', ['query' => $query], ['http_errors' => FALSE]);
        $code = $response->getStatusCode(); // 200
        $reason = $response->getReasonPhrase(); // OK
        $content = JSON::decode($response->getBody()->getContents());
        if ($code == '200') {
          drupal_set_message(t('------------------ Market ' . $query['locale'] . ' report: --------------------'), 'status');

          // Correct HTTP Response, let's check Market and Tags
          if ($content['recipes']['numResults'] == '0') {
            $form_state->setErrorByName('connect_market', $this->t('No results obtained in: ' . $market . ', please check the Market Code'));
          }
          else {
            drupal_set_message(t('With the current SRH configuration ' . $content['recipes']['numResults'] . ' <b>published</b> recipes are going to be synchronized.'), 'status');
          }

          /**
           * Once we have a correct call and we have results with the specific market, we check if all the Brands return results, otherwise we throw a status message with the result.
           */
          $brands = $form_state->getValue('connect_brands');

          if (!empty($brands)) {
            $brandsArray = explode(',', $brands);
            foreach ($brandsArray as $brakey => $brand) {
              $brand = ltrim($brand);
              //$query['brand'] = $brand;
              $query['complexQuery'] = 'recipes@brand:' . $brand;
              $braResponse = $client->request('GET', $url . '/search', ['query' => $query], ['http_errors' => FALSE]);
              $contentBra = JSON::decode($braResponse->getBody()
                ->getContents());
              $codeBra = $braResponse->getStatusCode(); // 200
              if ($codeBra == '200') {
                if ($contentBra['recipes']['numResults'] == '0') {
                  drupal_set_message(t('Be aware, with the brand: ' . $brand . ' in ' . $market . ' no results are returned'), 'error');
                }
                else {
                  drupal_set_message(t('With the Brand: ' . $brand . ' we have: ' . $contentBra['recipes']['numResults'] . ' results'), 'status');
                }
              }
              else {
                drupal_set_message(t('This brand: ' . $brand . ' has some problems or does not exists in market: ' . $market), 'error');
              }
            }
          }
          $query['brand'] = '';

          /* Once we have a correct call and we have results with the specific market, we check if all the collections return results
          */
          $collections = $form_state->getValue('connect_collection');
          if ($collections != '') {
            $collectionsArray = explode(',', $collections);
            foreach ($collectionsArray as $colkey => $collection) {
              $query['collectionName'] = $collection;
              $colResponse = $client->request('GET', $url . '/search', ['query' => $query], ['http_errors' => FALSE]);
              $contentCol = JSON::decode($colResponse->getBody()
                ->getContents());
              $codeCol = $colResponse->getStatusCode(); // 200
              if ($codeCol == '200') {
                if ($contentCol['recipes']['numResults'] == '0') {
                  drupal_set_message(t('Be aware, with the collection: ' . $collection . ' in ' . $market . ' no results are returned'), 'warning');
                }
                else {
                  drupal_set_message(t('With the collection: ' . $collection . ' we have: ' . $contentCol['recipes']['numResults'] . ' results'), 'status');
                }
              }
            }
            $query['collectionName'] = '';
          }

          /**
           * Once we have a correct call and we have results with the specific market, we check if all the Tags return results
           */
          $tags = $form_state->getValue('connect_tags_mul');
          foreach ($tags as $key => $value) {
            if (!is_object($value)) {
              $tagNames = explode(',', $value['fieldTags']);
              foreach ($tagNames as $key => $value) {
                if (!empty($value)) {
                  $query['complexQuery'] = 'recipes@ tag:' . $value;
                  $responseTag = $client->request('GET', $url . '/search', ['query' => $query], ['http_errors' => FALSE]);
                  $contentTag = JSON::decode($responseTag->getBody()
                    ->getContents());
                  $codeTag = $responseTag->getStatusCode(); // 200
                  if ($codeTag == '200') {
                    if ($contentTag['recipes']['numResults'] == '0') {
                      drupal_set_message(t('Be aware, with the tag: ' . $value . ' in ' . $market . ' no results are returned'), 'warning');
                    }
                    else {
                      drupal_set_message(t('With the tag ' . $value . ' we have: ' . $contentTag['recipes']['numResults'] . ' results'), 'status');
                    }
                  }
                }
              }
            }
          }
        }
      }
      catch (RequestException $e) {
        if ($e->getCode() == '403') {
          $form_state->setErrorByName('connect_apikey', $this->t('Oops! Foorbiden acces! check if the APIKEY or URL VERSION are correct. -> The HTTP code and the reason was: ' . $e->getMessage()));
          $form_state->setErrorByName('connect_URL');
        }
        else {
          $form_state->setErrorByName('connect_URL', $this->t('Networking error, check the URL. Error:' . $e->getMessage()));
        }
      }
    }
  }

  private function getValue($form_state, $prop_name) {

    return trim($form_state->getValue($prop_name));
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {


    // Init de configuration Factory
    $config = $this->configFactory->getEditable('dsu_srh.settings');
    //$locales = $form_state->getValue('locales');
    $locales = ($form_state->getValue('locales'));
    unset($locales['add_locale']);
    if (!empty($locales)) {
      foreach ($locales as $key => $value) {
        if ($value['connect_markets'] != '') {
          if ($value['langcode'] == '') {
            $locales[$key]['langcode'] = Drupal::languageManager()
              ->getCurrentLanguage()
              ->getId();
          }
        }
        else {
          unset($locales[$key]);
        }
      }
    }
    Drupal::logger('SRH')
      ->notice('locales; <pre><code>' . print_r($locales, TRUE) . '</code></pre');

    $config->set('dsu_srh.dsu_connect_tagsmul', $form_state->getValue('connect_tags_mul'));
    $config->set('dsu_srh.dsu_connect_url', $this->getValue($form_state, 'connect_URL'));
    $config->set('dsu_srh.dsu_connect_ciamnum', $this->getValue($form_state, 'connect_ciamnum'));
    $config->set('dsu_srh.dsu_connect_market_code', $this->getValue($form_state, 'connect_market_code'));
    $config->set('dsu_srh.dsu_connect_markets', $this->getValue($form_state, 'connect_markets'));
    $config->set('dsu_srh.dsu_connect_apisecret', $this->getValue($form_state, 'connect_apisecret'));
    $config->set('dsu_srh.dsu_connect_apikey', $this->getValue($form_state, 'connect_apikey'));
    $config->set('dsu_srh.dsu_connect_collection', $this->getValue($form_state, 'connect_apicollection'));
    $config->set('dsu_srh.dsu_connect_apilifetimet', $this->getValue($form_state, 'connect_apilifetime'));
    $config->set('dsu_srh.dsu_connect_periodic', $this->getValue($form_state, 'connect_periodic'));
    $config->set('dsu_srh.dsu_connect_amount', $this->getValue($form_state, 'connect_amount'));
    $config->set('dsu_srh.dsu_connect_interval', $this->getValue($form_state, 'connect_interval_cron'));
    $config->set('dsu_srh.dsu_connect_cron_sync_update_type', $this->getValue($form_state, 'cron_last_updated_type'));
    $config->set('dsu_srh.dsu_connect_collection', $this->getValue($form_state, 'connect_collection'));
    // $config->set('dsu_srh.dsu_connect_quantity', $this->getValue($form_state, 'connect_quantity'));
    $config->set('dsu_srh.dsu_connect_isnew', $this->getValue($form_state, 'connect_isnew'));
    $config->set('dsu_srh.dsu_connect_brands', $this->getValue($form_state, 'connect_brands'));
    $config->set('dsu_srh.dsu_connect_locales', $locales);

    $config->save();

    return parent::submitForm($form, $form_state);
  }

}
