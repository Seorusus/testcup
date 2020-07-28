<?php

namespace Drupal\ln_adimo\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'integrationWidget' widget.
 *
 * @FieldWidget(
 *   id = "integrationWidget",
 *   label = @Translation("Adimo Integration - Widget"),
 *   description = @Translation("Adimo Integration  - Widget"),
 *   field_types = {
 *     "integrationParams",
 *   },
 *   multiple_values = TRUE,
 * )
 */
class IntegrationWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {

    $cssCustom = isset($items[$delta]->customCSS) ? $items[$delta]->customCSS : '';
    $tpId = isset($items[$delta]->touchpointID) ? $items[$delta]->touchpointID : '';
    $integrationList = isset($items[$delta]->integrationType) ? $items[$delta]->integrationType : '';


    $file = file_get_contents(drupal_get_path('module', 'ln_adimo') . '/integrations.json', FILE_USE_INCLUDE_PATH);


    $json = json_decode($file);

    $options = [];

    foreach ($json->integrations as $integration) {
      array_push($options, $integration->key);
    }

    $element['integrationType'] = [
      '#type' => 'select',
      '#title' => t('Integration Type'),
      '#description' => t('Select an Integration Type.'),
      '#options' => $options
      ,
      '#default_value' => $integrationList,
    ];

    $element['touchpointID'] = [
      '#type' => 'textfield',
      '#title' => t('Touchpoint ID'),
      '#description' => t('Touch Point Identifier'),
      '#default_value' => $tpId,

    ];

    $element['customCSS'] = [
      '#type' => 'textarea',
      '#title' => t('Custom CSS'),
      '#description' => t('Custom CSS'),
      '#default_value' => $cssCustom,
    ];


    return $element;
  }


}
