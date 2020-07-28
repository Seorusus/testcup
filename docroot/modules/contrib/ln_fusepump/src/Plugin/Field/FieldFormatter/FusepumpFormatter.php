<?php
/**
 * @file Contains
 *   \Drupal\ln_fusepump\Plugin\Field\FieldFormatter\FusepumpFormatter.
 */

namespace Drupal\ln_fusepump\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'field_fusepump' formatter.
 *
 * @FieldFormatter(
 *   id = "fusepump_formatter",
 *   module = "ln_fusepump",
 *   label = @Translation("Fusepump button formatter"),
 *   field_types = {
 *     "field_fusepump"
 *   }
 * )
 */
class FusepumpFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = [];
    $html_id = 'fusepump-'.rand(0, 999999);

    $fusepump_template = [
      '#theme' => 'fusepumpbutton',
      '#html_id' => $html_id
    ];
    $markup = \Drupal::service('renderer')->render($fusepump_template);
    foreach ($items as $delta => $item) {
      $element[$delta] = [
        '#markup' => $markup,
        '#values' => [
          'fusepump_id' => $item->value,
          'html_id' => $html_id,
        ],
      ];
    }
    return $element;
  }

}
