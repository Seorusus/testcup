<?php

namespace Drupal\ln_adimo\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Plugin implementation of the 'integrationParams' field type.
 *
 * @FieldType(
 *   id = "integrationParams",
 *   label = @Translation("Adimo Integration"),
 *   module = "ln_adimo",
 *   description = @Translation("Adds an Adimo web service to a web page."),
 *   default_widget = "integrationWidget",
 *   default_formatter = "integrationFormatter"
 * )
 */
class IntegrationParams extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {

    return [
      'columns' => [
        'integrationType' => [
          'description' => 'Integration Type.',
          'type' => 'text',
        ],
        'touchpointID' => [
          'description' => 'Touchpoint ID for this control.',
          'type' => 'text',
        ],
        'customCSS' => [
          'description' => 'Any custom CSS thats needed.',
          'type' => 'text',
        ],
      ],
    ];
  }


  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties['integrationType'] = DataDefinition::create('string')
      ->setLabel(t('integrationType'));

    $properties['touchpointID'] = DataDefinition::create('string')
      ->setLabel(t('touchpointID'));

    $properties['customCSS'] = DataDefinition::create('string')
      ->setLabel(t('customCSS'));

    return $properties;
  }

}
