<?php

/**
 * @file
 * Contains \Drupal\ln_alkemics\Form\ConnectForm.
 */

namespace Drupal\ln_alkemics\Form;


use Drupal;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class ConnectForm extends ConfigFormBase {

  /**
   * Drupal\Core\Config\ConfigFactoryInterface definition.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'ln_alkemics.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'ln_alkemics_config_form';
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
    $config = $this->config('ln_alkemics.settings');

    // Server call configuration
    $form['ln_alkemics_api_conf'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Configure the server call to Alkemics'),
      '#collapsible' => TRUE,
      '#collapsed' => FALSE,
    ];
    $form['ln_alkemics_api_conf']['alkemics_api_endpoint_token_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Alkemics API Endpoint Token URL'),
      '#description' => $this->t('To connect with Alkemics, REST API requests need to be send to a Endpoint Token URL.'),
      '#default_value' => $config->get('ln_alkemics.alkemics_api_endpoint_token_url'),
      '#required' => TRUE,
    ];

    $form['ln_alkemics_api_conf']['alkemics_api_client_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Alkemics API Client ID'),
      '#description' => $this->t('Please enter Alkemics API Client ID.'),
      '#default_value' => $config->get('ln_alkemics.alkemics_api_client_id'),
      '#required' => TRUE,
    ];

    $form['ln_alkemics_api_conf']['alkemics_api_client_secret'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Alkemics API Client Secret'),
      '#description' => $this->t('Please enter Alkemics API Client Secret Key.'),
      '#default_value' => $config->get('ln_alkemics.alkemics_api_client_secret'),
      '#required' => TRUE,
    ];

    $form['ln_alkemics_api_conf']['alkemics_api_target_market_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Target market ID'),
      '#description' => $this->t('Please enter target market ID.'),
      '#default_value' => $config->get('ln_alkemics.alkemics_api_target_market_id'),
      '#required' => TRUE,
    ];

    $form['ln_alkemics_api_conf']['alkemics_api_target_brand_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Target brand ID'),
      '#description' => $this->t('Please enter target brand ID.'),
      '#default_value' => $config->get('ln_alkemics.alkemics_api_target_brand_id'),
      '#required' => TRUE,
    ];

    $form['ln_alkemics_api_conf']['alkemics_api_market_gtin'] = [
      '#type' => 'textfield',
      '#title' => $this->t('GTIN'),
      '#description' => $this->t('Please enter Market GTIN ID.'),
      '#default_value' => $config->get('ln_alkemics.alkemics_api_market_gtin'),
    ];

    $form['sync_conf'] = [
      '#type' => 'fieldset',
      '#title' => t('Configure synchronization process in your website'),
      '#collapsible' => TRUE,
      '#collapsed' => FALSE,
    ];

    $form['sync_conf']['alkemics_periodic_import_time_interval'] = [
      '#type' => 'checkbox',
      '#title' => t('Turn on the schedule synchronization'),
      '#description' => $this->t('Be Aware! When using for the first time, process may hang up due to memory shortage. Check you server configuration to avoid PHP limits'),
      '#return_value' => TRUE,
      '#default_value' => $config->get('ln_alkemics.alkemics_periodic_import_time_interval'),

    ];
    $form['sync_conf']['alkemics_connect_interval_cron'] = [
      '#type' => 'select',
      '#title' => $this
        ->t('Set the interval time to Synchronize Products with the Alkemics'),
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
      '#default_value' => $config->get('ln_alkemics.alkemics_connect_interval'),
      '#description' => $this->t('Interval value indicates the period in which synchronization process is enqueued in drupal cron jobs'),
    ];
    $form['sync_conf']['connect_isnew'] = [
      '#type' => 'select',
      '#title' => $this
        ->t('Sets the interval when Product are marked with the "New" tag'),
      '#options' => [
        '86400' => $this->t('1 day'),
        '432000' => $this->t('5 days'),
        '604800' => $this->t('7 days'),
        '1296000' => $this->t('15 days'),
        '2592000' => $this->t('30 days'),
        '7776000' => $this->t('90 days'),
      ],
      '#default_value' => $config->get('ln_alkemics.alkemics_connect_isnew'),
      '#description' => $this->t('Product will be updated during synchronization process. Set a number period greater than Cron synchronization to properly make use of this feature'),
    ];

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#title' => $this->t('Save'),
      '#value' => t('Save'),
    ];

    return $form;

  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    // Checking endpoint details with client token.
    $endpoint = $form_state->getValue('alkemics_api_endpoint_token_url');
    $client_id = $form_state->getValue('alkemics_api_client_id');
    $client_secret = $form_state->getValue('alkemics_api_client_secret');

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
      $code = $response->getStatusCode();
      if ($code == '200') {
        drupal_set_message(t('Alkemics Tokens authentication connected successfully.'), 'status');
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

  /**
   * @param $form_state
   * @param $prop_name
   *
   * @return string
   */
  private function getValue($form_state, $prop_name) {
    return trim($form_state->getValue($prop_name));
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);
    // Init configuration Factory
    $config = $this->configFactory->getEditable('ln_alkemics.settings');

    // Set config values.
    $config->set('ln_alkemics.alkemics_api_endpoint_token_url', $form_state->getValue('alkemics_api_endpoint_token_url'));
    $config->set('ln_alkemics.alkemics_api_market_gtin', $form_state->getValue('alkemics_api_market_gtin'));
    $config->set('ln_alkemics.alkemics_api_client_id', $this->getValue($form_state, 'alkemics_api_client_id'));
    $config->set('ln_alkemics.alkemics_api_client_secret', $this->getValue($form_state, 'alkemics_api_client_secret'));
    $config->set('ln_alkemics.alkemics_api_target_market_id', $this->getValue($form_state, 'alkemics_api_target_market_id'));
    $config->set('ln_alkemics.alkemics_api_target_brand_id', $this->getValue($form_state, 'alkemics_api_target_brand_id'));
    $config->set('ln_alkemics.alkemics_periodic_import_time_interval', $this->getValue($form_state, 'alkemics_periodic_import_time_interval'));
    $config->set('ln_alkemics.alkemics_connect_interval_cron', $this->getValue($form_state, 'alkemics_connect_interval'));
    $config->set('ln_alkemics.connect_isnew', $this->getValue($form_state, 'alkemics_connect_isnew'));

    $config->save();

    return parent::submitForm($form, $form_state);
  }

}
