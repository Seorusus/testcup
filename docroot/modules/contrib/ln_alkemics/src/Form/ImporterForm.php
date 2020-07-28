<?php

namespace Drupal\ln_alkemics\Form;

use Drupal\Component\Serialization\Json;
use Drupal\Core\Config\ConfigFactory;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\ln_alkemics\Controller\Importer;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Implements a Batch example Form.
 */
class ImporterForm extends FormBase {

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

  /**
   * DSU Alkemics Products Importer service
   *
   * @var array
   */
  protected $importer;

  public function __construct(ConfigFactory $configFactory, Json $serialization, Importer $importer) {
    $this->configFactory = $configFactory;
    $this->serialization = $serialization;
    $this->importer = $importer;

  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('serialization.json'),
      $container->get('ln_alkemics.importer')
    );
  }

  /**
   * {@inheritdoc}.
   */
  public function getFormId() {
    return 'ln_alkemics_importer_form';
  }

  /**
   * {@inheritdoc}.
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    drupal_set_message($this->t('Remind, to proceed with the manual importation process is mandatory configure correctly the connector in <a href="config"> Here </a>'), 'warning');
    $config = $config = $this->config('ln_alkemics.settings');
    $form['submit_button'] = [
      '#type' => 'submit',
      '#value' => $this->t('Start Synchronize'),
      '#description' => $this->t('Be aware, if is the first time you Synchronize the market, the process will delay lot of time. Configure your PHP and your FAST CGI to support it. If you have already Synchronized your market, the UPDATE and CLEAN process will delay only few minutes. The process it is made in batch of 250 recipes'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {

    $config = $this->configFactory->getEditable('ln_alkemics.settings');
    if ($config->get('ln_alkemics.alkemics_api_endpoint_token_url') == 'NULL') {
      $form_state->setErrorByName('submit_button', $this->t('The connector is misconfigured, configure it in admin/config/ln_alkemics/config'));
    }
    if ($config->get('ln_alkemics.alkemics_api_client_id') == 'NULL') {
      $form_state->setErrorByName('submit_button', $this->t('The connector is misconfigured, configure it in admin/config/ln_alkemics/config'));
    }
    if ($config->get('ln_alkemics.alkemics_api_client_secret') == NULL || $config->get('ln_alkemics.alkemics_api_client_secret') == '') {
      $form_state->setErrorByName('submit_button', $this->t('The connector is misconfigured, configure it in admin/config/ln_alkemics/config'));
    }
    if ($config->get('ln_alkemics.alkemics_api_target_market_id') == NULL || $config->get('ln_alkemics.alkemics_api_target_market_id') == '') {
      $form_state->setErrorByName('submit_button', $this->t('The connector is misconfigured, configure it in admin/config/ln_alkemics/config'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    // Set last batch updated time.
    $token = $this->importer->getAlkemicsTokenAuth();

    /**
     * Configuration of batch process
     */
    $batch = [
      'title' => t('Smart Alkemics Product synchronizer'),
      'operations' => [],
      'init_message' => t('Starting to Synchronize'),
      'progress_message' => t('Processing in rounds of Alkemics Products.'),
      'error_message' => t('An error occurred during processing'),
      'finished' => drupal_set_message('Synchronize Released, check in admin/content to see the Products.'),
    ];
    /*
     * Preflight to get All id of specific market & specific brands configured in the UI by the admin
     */
    $groups = $this->importer->getAllId($token);
    /*
     * Now we configure th batch operations
     */
    foreach ($groups as $key => $values) {
      $batch['operations'][] = [
        '\Drupal\ln_alkemics\Controller\Importer::syncroProducts',
        [$values['product']],
      ];
    }
    batch_set($batch);
  }

}
