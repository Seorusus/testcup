<?php

  namespace Drupal\ln_datalayer\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class LightnestDatalayerForm.
 *
 * @package Drupal\ln_datalayer\Form
 */
class LightnestDatalayerForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'ln_datalayer_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['ln_datalayer.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $datalayer_settings = $this->config('ln_datalayer.settings');

    $form['general'] = [
      '#type' => 'details',
      '#open' => TRUE,
      '#title' => $this->t('Data layer output keys'),
      '#description' => $this->t('Define keys used in the datalayer output. Keys for field values are configurable via the field edit form.'),
    ];

    // Build form elements.
    $brand = $datalayer_settings->get('brand');
    $form['general']['brand'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Brand'),
      '#description' => $this->t('The value for Brand following Site specific standard'),
      '#default_value' => isset($brand) ? $brand : 'brand',
      '#size' => 30,
    ];

    $zone = $datalayer_settings->get('zone');
    $form['general']['zone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Site Zone'),
      '#description' => $this->t('Country or Site specific zone.'),
      '#default_value' => isset($zone) ? $zone : 'zone',
      '#size' => 30,
    ];

    $country = $datalayer_settings->get('country');
    $form['general']['country'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Country'),
      '#description' => $this->t('Country of website.'),
      '#default_value' => isset($country) ? $country : 'Country',
      '#size' => 30,
    ];

    $business = $datalayer_settings->get('business');
    $form['general']['business'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Business'),
      '#description' => $this->t('Business for site brand eg. Nescafe'),
      '#default_value' => isset($business) ? $business : 'Business',
      '#size' => 30,
    ];

    $siteType = $datalayer_settings->get('siteType');
    $form['general']['siteType'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Site Type'),
      '#description' => $this->t('Type of site for user eg. portal, website.'),
      '#default_value' => isset($siteType) ? $siteType : 'Website',
      '#size' => 30,
    ];

    $technology = $datalayer_settings->get('technology');
    $form['general']['technology'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Site Technology'),
      '#description' => $this->t('Technology of site is build eg. Drupal'),
      '#default_value' => isset($technology) ? $technology : 'Drupal',
      '#size' => 30,
    ];

    $digi_pi_id = $datalayer_settings->get('digi_pi_id');
    $form['general']['digi_pi_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('DigiPiID'),
      '#description' => $this->t('Mention the DigiPi ID assigned to the website'),
      '#default_value' => isset($digi_pi_id) ? $digi_pi_id : '####',
      '#size' => 12,
    ];

    $properties = $datalayer_settings->get('properties');
    $form['general']['properties'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Site Properties'),
      '#description' => $this->t('Additional properties for site require in GMT.'),
      '#default_value' => isset($properties) ? $properties : 'Additional Properties',
      '#size' => 40,
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Save default form settings.
    $this->config('ln_datalayer.settings')
      ->set('brand', $form_state->getValue('brand'))
      ->set('zone', $form_state->getValue('zone'))
      ->set('country', $form_state->getValue('country'))
      ->set('business', $form_state->getValue('business'))
      ->set('siteType', $form_state->getValue('siteType'))
      ->set('technology', $form_state->getValue('technology'))
      ->set('properties', $form_state->getValue('properties'))
      ->set('digi_pi_id', $form_state->getValue('digi_pi_id'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}
