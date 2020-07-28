<?php
/**
 * @file
 * Contains \Drupal\dsu_engage\Form\DsuEngageForm.
 */

namespace Drupal\dsu_engage\Form;

use Drupal\Component\Render\FormattableMarkup;
use Drupal\Component\Serialization\Json;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\dsu_engage\Controller\DsuEngageController;
use Egulias\EmailValidator\EmailValidator;
use Symfony\Component\DependencyInjection\ContainerInterface;

class DsuEngageForm extends FormBase {

  /**
   * The entity type manager
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface;
   */
  protected $entityTypeManager;

  /**
   * The email validator.
   *
   * @var \Egulias\EmailValidator\EmailValidator
   */
  protected $emailValidator;

  /**
   * The configuration factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * Constructs a new FieldStorageAddForm object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The configuration factory.
   */
  public function __construct(ConfigFactoryInterface $config_factory, EmailValidator $email_validator, EntityTypeManagerInterface $entity_type_manager) {
    $this->configFactory = $config_factory;
    $this->emailValidator = $email_validator;
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('email.validator'),
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'dsu_engage.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'dsu_engage_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // TODO: Refactor since required option doesn't respect at all the backend settings
    $fields = [
      0 => [
        'name' => 'field_product_description',
        'label' => 'Product Description',
      ],
      1 => ['name' => 'field_first_name', 'label' => 'First Name'],
      2 => ['name' => 'field_last_name', 'label' => 'Last Name'],
      3 => [
        'name' => 'field_preferred_channel',
        'label' => 'Preferred Channel',
      ],
      4 => ['name' => 'field_email', 'label' => 'E-Mail'],
      5 => ['name' => 'field_phone', 'label' => 'Phone'],
      6 => ['name' => 'field_phone_prefix', 'label' => 'Phone prefix'],
      7 => ['name' => 'field_batch_code', 'label' => 'Batch Code'],
      8 => ['name' => 'field_bar_code', 'label' => 'Bar Code'],
      9 => [
        'name' => 'field_best_before_date',
        'label' => 'Best before date',
      ],
      10 => ['name' => 'field_street', 'label' => 'Street'],
      11 => ['name' => 'field_city', 'label' => 'City'],
      12 => ['name' => 'field_zip_code', 'label' => 'Zip Code'],
      13 => ['name' => 'field_state', 'label' => 'State'],
      14 => ['name' => 'field_country', 'label' => 'Country'],
      15 => ['name' => 'field_attachments', 'label' => 'Attachments'],
    ];

    $config = $this->configFactory->get('dsu_engage.settings');
    $form['#theme'] = 'dsu_engage_form';

    //adding basic CSS to the form
    $form['#attached']['library'][] = 'dsu_engage/dsu_engage_form';
    $form['#attached']['drupalSettings']['phone_prefix'] = DsuEngageController::getPhonePrefixes();

    //Create buttons instead of radio selected
    $selected = $config->get('show_field_request_type_options');

    //Create hidden radio buttons
    $options = [];

    // The buttons
    $question_buttons = "";
    $currentRequest = $form_state->getValue('request_type') ?: 'question';
    $activeQuestion = $currentRequest === 'question' ? 'active' : '';
    $activeComplaint = $currentRequest === 'complaint' ? 'active' : '';
    $activePraise = $currentRequest === 'praise' ? 'active' : '';
    $lang_id = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $tooltip_config = \Drupal::config('dsu_engage_tooltip_form.settings');


    if ($selected['question']) {
      $question_buttons .= '<a class="questionbuttons questionbutton1 col - md - 4 ">' . $this->t("I have a question/suggestion") . '</a>';
      $options['question'] = $this->t("I have a question/suggestion");
    }

    if ($selected['complaint']) {
      $question_buttons .= '<a class="questionbuttons questionbutton2 col - md - 4 ">' . $this->t("I have a complaint") . '</a>';
      $options['complaint'] = $this->t("I have a complaint");
    }

    if ($selected['praise']) {
      $question_buttons .= '<a class="questionbuttons questionbutton3 col - md - 4 ">' . $this->t("I have a praise") . '</a>';
      $options['praise'] = $this->t("I have a praise");
    }

    $form['contact_us_form'] = [
      '#type' => 'details',
      '#open' => 'open',
    ];

    $form['contact_us_form']['request_type'] = [
      '#type' => 'radios',
      '#title' => $this->t('What would you like to contact us about?'),
      '#options' => $options,
      '#default_value' => $currentRequest,
      '#suffix' => $question_buttons,
      '#required' => TRUE,
    ];
    $form['contact_us_form']['description'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Description'),
      '#title_display' => 'invisible',
      '#attributes' => [
        'placeholder' => $this->t('Your message *'),
      ],
      '#filter' => [
        'strip_tags',
      ],
      '#rules' => [
        'length[40,32000]',
      ],
      '#maxlength' => 255,
    ];

    if ($config->get('show_field_product_description_question') || $config->get('show_field_product_description_complaint') || $config->get('show_field_product_description_praise')
      || $config->get('show_field_bar_code_question') || $config->get('show_field_bar_code_complaint') || $config->get('show_field_bar_code_praise')
      || $config->get('show_field_batch_code_question') || $config->get('show_field_batch_code_complaint') || $config->get('show_field_batch_code_praise')
      || $config->get('show_field_best_before_date_question') || $config->get('show_field_best_before_date_complaint') || $config->get('show_field_best_before_date_praise')) {

      $visible = [];
      if ($config->get('show_field_product_description_question') || $config->get('show_field_bar_code_question') || $config->get('show_field_batch_code_question') || $config->get('show_field_best_before_date_question')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'question'],
        ];
      }
      if ($config->get('show_field_product_description_complaint') || $config->get('show_field_bar_code_complaint') || $config->get('show_field_batch_code_complaint') || $config->get('show_field_best_before_date_complaint')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'complaint'],
        ];
      }
      if ($config->get('show_field_product_description_praise') || $config->get('show_field_bar_code_praise') || $config->get('show_field_batch_code_praise') || $config->get('show_field_best_before_date_praise')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'praise'],
        ];
      }
      $form['contact_us_form']['product'] = [
        '#type' => 'details',
        '#title' => $this->t('Product Information'),
        '#open' => TRUE,
        '#states' => [
          'visible' => $visible,
        ],
      ];
    }

    if ($config->get('show_field_product_description_question') || $config->get('show_field_product_description_complaint') || $config->get('show_field_product_description_praise')) {
      $visible = [];
      $required = [];

      if ($config->get('show_field_product_description_question')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'question'],
        ];
        if ($config->get('mandatory_field_product_description_question')) {
          $required[':input[name="request_type"]'][] = ['value' => 'question'];
        }
      }
      if ($config->get('show_field_product_description_complaint')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'complaint'],
        ];
        if ($config->get('mandatory_field_product_description_complaint')) {
          $required[':input[name="request_type"]'][] = ['value' => 'complaint'];
        }
      }
      if ($config->get('show_field_product_description_praise')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'praise'],
        ];
        if ($config->get('mandatory_field_product_description_praise')) {
          $required[':input[name="request_type"]'][] = ['value' => 'praise'];
        }
      }
      $form['contact_us_form']['product']['product_description'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Product description'),
        '#title_display' => 'invisible',
        '#attributes' => [
          'placeholder' => $this->t('Product description'),
          'size' => '',
        ],
        '#states' => [
          'visible' => $visible,
          'required' => $required,
        ],
        '#rules' => [
          'length[3,255]',
        ],
      ];
    }

    if ($config->get('show_field_batch_code_question') || $config->get('show_field_batch_code_complaint') || $config->get('show_field_batch_code_praise')) {
      $visible = [];
      $required = [];

      if ($config->get('show_field_batch_code_question')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'question'],
        ];
        if ($config->get('mandatory_field_batch_code_question')) {
          $required[':input[name="request_type"]'][] = ['value' => 'question'];
        }
      }
      if ($config->get('show_field_batch_code_complaint')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'complaint'],
        ];
        if ($config->get('mandatory_field_batch_code_complaint')) {
          $required[':input[name="request_type"]'][] = ['value' => 'complaint'];
        }
      }
      if ($config->get('show_field_batch_code_praise')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'praise'],
        ];
        if ($config->get('mandatory_field_batch_code_praise')) {
          $required[':input[name="request_type"]'][] = ['value' => 'praise'];
        }
      }

      $form['contact_us_form']['product']['batchcode'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Batch code'),
        '#title_display' => 'invisible',
        '#attributes' => [
          'placeholder' => $this->t('Batch code'),
          'data-tool-tip' => 'has-batch-code',
        ],
        '#states' => [
          'visible' => $visible,
          'required' => $required,
        ],
        '#maxlength' => 64,
      ];


      $tooltip_image_batch = $tooltip_config->get('dsu_engage_tooltip_image_batch_' . $lang_id);
      if (isset($tooltip_image_batch['0']) && !empty($tooltip_image_batch['0'])) {
        $form['contact_us_form']['tooltip_url_batch'] = get_engage_file_url_using_fid($tooltip_image_batch['0']);
      }

      $tooltip_text_batch = $tooltip_config->get('dsu_engage_tooltip_text_batch_code_' . $lang_id);
      if (isset($tooltip_text_batch) && !empty($tooltip_text_batch)) {
        $form['contact_us_form']['tooltip_text_batch'] = $tooltip_text_batch;
      }

    }
    if ($config->get('show_field_bar_code_question') || $config->get('show_field_bar_code_complaint') || $config->get('show_field_bar_code_praise')) {
      $visible = [];
      $required = [];

      if ($config->get('show_field_bar_code_question')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'question'],
        ];
        if ($config->get('mandatory_field_bar_code_question')) {
          $required[':input[name="request_type"]'][] = ['value' => 'question'];
        }
      }

      if ($config->get('show_field_batch_code_complaint')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'complaint'],
        ];
        if ($config->get('mandatory_field_bar_code_complaint')) {
          $required[':input[name="request_type"]'][] = ['value' => 'complaint'];
        }
      }

      if ($config->get('show_field_bar_code_praise')) {
        $visible[] = [
          ':input[name="request_type"]' => ['value' => 'praise'],
        ];
        if ($config->get('mandatory_field_bar_code_praise')) {
          $required[':input[name="request_type"]'][] = ['value' => 'praise'];
        }
      }

      $tooltip_image_bar = $tooltip_config->get('dsu_engage_tooltip_image_bar_' . $lang_id);
      if (isset($tooltip_image_bar['0']) && !empty($tooltip_image_bar['0'])) {
        $form['contact_us_form']['tooltip_url_bar'] = get_engage_file_url_using_fid($tooltip_image_bar['0']);
      }

      $tooltip_text_bar = $tooltip_config->get('dsu_engage_tooltip_text_bar_code_' . $lang_id);
      if (isset($tooltip_text_bar) && !empty($tooltip_text_bar)) {
        $form['contact_us_form']['tooltip_text_bar'] = $tooltip_text_bar;
      }

      $form['contact_us_form']['product']['barcode'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Bar code'),
        '#title_display' => 'invisible',
        '#attributes' => [
          'placeholder' => $this->t('Bar code'),
          'data-tool-tip' => 'has-bar-code',
        ],
        '#states' => [
          'visible' => $visible,
          'required' => $required,
        ],
        '#maxlength' => 64,
      ];
    }
    if ($config->get('show_field_best_before_date_question') || $config->get('show_field_best_before_date_complaint') || $config->get('show_field_best_before_date_praise')) {
      $visible = [];
      $required = [];
      if ($config->get('show_field_best_before_date_question')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'question'];
        if ($config->get('mandatory_field_best_before_date_question')) {
          $required[':input[name="request_type"]'][] = ['value' => 'question'];
        }

      }
      if ($config->get('show_field_best_before_date_complaint')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'complaint'];
        if ($config->get('mandatory_field_best_before_date_complaint')) {
          $required[':input[name="request_type"]'][] = ['value' => 'complaint'];
        }
      }
      if ($config->get('show_field_best_before_date_praise')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'praise'];
        if ($config->get('mandatory_field_best_before_date_praise')) {
          $required[':input[name="request_type"]'][] = ['value' => 'praise'];
        }
      }
      $form['contact_us_form']['product']['bestBeforeDate'] = [
        '#type' => 'date',
        '#title' => $this->t('Best before date'),
        '#default_value' => date('Y-m-d', time()),
        '#size' => 60,
        '#date_format' => 'Y-m-d',
        '#date_label_position' => 'none',
        '#title_display' => 'invisible',
        '#date_year_range' => '2000:2100',
        '#description' => $this->t('Best before date'),
        '#attributes' => [
          'min' => '2000-01-01',
          'max' => '2100-01-01',
        ],
        '#states' => [
          'visible' => $visible,
          'required' => $required,
        ],
      ];
    }

    $form['contact_us_form']['contact'] = [
      '#type' => 'details',
      '#title' => $this->t('Your Contact Information'),
      '#open' => TRUE,
    ];

    if ($config->get('show_field_first_name_question') || $config->get('show_field_first_name_complaint') || $config->get('show_field_first_name_praise')) {
      $visible = [];
      $required = [];
      if ($config->get('show_field_first_name_question')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'question'];
        if ($config->get('mandatory_field_first_name_question')) {
          $required[':input[name="request_type"]'][] = ['value' => 'question'];
        }

      }
      if ($config->get('show_field_first_name_complaint')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'complaint'];
        if ($config->get('mandatory_field_first_name_complaint')) {
          $required[':input[name="request_type"]'][] = ['value' => 'complaint'];
        }
      }
      if ($config->get('show_field_first_name_praise')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'praise'];
        if ($config->get('mandatory_field_first_name_praise')) {
          $required[':input[name="request_type"]'][] = ['value' => 'v'];
        }
      }
      $form['contact_us_form']['contact']['firstName'] = [
        '#type' => 'textfield',
        '#title' => $this->t('First Name'),
        '#attributes' => [
          'placeholder' => $this->t('First Name'),
          'size' => '',
        ],
        '#title_display' => 'invisible',
        '#prefix' => '<div class="row"><div class="col-xs-6">',
        '#suffix' => '</div>',
        '#maxlength' => 64,
        '#states' => [
          'required' => $required,
          'visible' => $visible,
        ],
      ];
    }
    if ($config->get('show_field_last_name_question') || $config->get('show_field_last_name_complaint') || $config->get('show_field_last_name_praise')) {
      $visible = [];
      $required = [];
      if ($config->get('show_field_last_name_question')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'question'];
        if ($config->get('mandatory_field_last_name_question')) {
          $required[':input[name="request_type"]'][] = ['value' => 'question'];
        }

      }
      if ($config->get('show_field_last_name_complaint')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'complaint'];
        if ($config->get('mandatory_field_last_name_complaint')) {
          $required[':input[name="request_type"]'][] = ['value' => 'complaint'];
        }
      }
      if ($config->get('show_field_last_name_praise')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'praise'];
        if ($config->get('mandatory_field_last_name_praise')) {
          $required[':input[name="request_type"]'][] = ['value' => 'praise'];
        }
      }
      $form['contact_us_form']['contact']['lastName'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Last Name'),
        '#attributes' => [
          'placeholder' => $this->t('Last Name'),
          'size' => '',
        ],
        '#title_display' => 'invisible',
        '#prefix' => '<div class="col-xs-6">',
        '#suffix' => '</div></div>',
        '#maxlength' => 64,
        '#states' => [
          'required' => $required,
          'visible' => $visible,
        ],
      ];
    }
    if ($config->get('show_field_preferred_channel_question') || $config->get('show_field_preferred_channel_complaint') || $config->get('show_field_preferred_channel_praise')) {
      $visible = [];
      if ($config->get('show_field_preferred_channel_question')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'question'];
        $required = $config->get('mandatory_field_preferred_channel_question');

      }
      if ($config->get('show_field_preferred_channel_complaint')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'complaint'];
        $required = $config->get('mandatory_field_preferred_channel_complaint');
      }
      if ($config->get('show_field_preferred_channel_praise')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'praise'];
        $required = $config->get('mandatory_field_preferred_channel_praise');
      }

      $form['contact_us_form']['contact']['preferredChannel'] = [
        '#type' => 'select',
        '#title' => $this->t('How would you like us to get in touch with you?'),
        '#required' => $required,
        '#attributes' => [
          'placeholder' => $required ? $this->t('Preferred channel') . " *" : $this->t('Preferred channel'),
        ],
        '#default_value' => 0,
        '#options' => [
          'email' => $this->t("Email"),
          'phone' => $this->t("Phone"),
        ],
        '#states' => [
          'visible' => $visible,
          'required' => $required,
        ],
        '#ajax' => [
          'event' => 'change',
          'callback' => '::setRequiredField',
          'wrapper' => 'phone',
        ],
      ];
    }

    $form['contact_us_form']['contact']['email'] = [
      '#type' => 'textfield',
      '#title_display' => 'invisible',
      '#title' => $this->t('Email address'),
      '#prefix' => '<div class="row"><div class="col-xs-6">',
      '#suffix' => '</div>',
      '#attributes' => [
        'placeholder' => $this->t('Email address') . " *",
        'type' => 'email',
      ],
      '#maxlength' => 64,
      '#states' => [
        'visible' => $visible,
      ],
      '#filters' => ['trim', 'lowercase'],
    ];

    //The conditions visible and required are set if preferredChannel is phone.
    $form['contact_us_form']['contact']['phone_prefix'] = [
      '#type' => 'select',
      '#title' => $this->t('Phone prefix'),
      '#title_display' => 'invisible',
      '#prefix' => '<div class="col-xs-6"><div class="col-xs-4">',
      '#suffix' => '</div>',
      '#options' => array_flip(DsuEngageController::getPhonePrefixesValues()),
      '#default_value' => DsuEngageController::getCountryPrefix(DsuEngageController::getMarketCountries($config->get('dsu_engage_api_market'))),
      '#states' => [
        'visible' => $visible,
      ],
    ];
    //The conditions visible and required are set if preferredChannel is phone.
    if ($form_state->getValues('preferredChannel') != "phone") {
      $form['contact_us_form']['contact']['phone'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Phone'),
        '#title_display' => 'above',
        '#prefix' => '<div id="phone" class="col-xs-8">',
        '#suffix' => '</div></div></div>',
        '#attributes' => [
          'placeholder' => $this->t('Phone'),
        ],
        '#maxlength' => 64,
        '#states' => [
          'visible' => $visible,
          'required' => [
            ':input[name="preferredChannel"][]' => ['value' => 'phone'],
          ],
        ],

      ];
    }
    else {
      $form['contact_us_form']['contact']['phone'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Phone'),
        '#title_display' => 'above',
        '#prefix' => '<div id="phone" class="col-xs-8">',
        '#suffix' => '</div></div></div>',
        '#attributes' => [
          'placeholder' => $this->t('* Phone'),
        ],
        '#maxlength' => 64,
        '#states' => [
          'visible' => $visible,
          /*'required' => [
            ':input[name="preferredChannel"]' => ['value' => 'phone'],
          ],*/
        ],

      ];
    }

    if ($config->get('show_field_street_question') || $config->get('show_field_street_complaint') || $config->get('show_field_street_praise')) {
      $visible = [];
      $required = [];
      if ($config->get('show_field_street_question')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'question'];
        if ($config->get('mandatory_field_street_question')) {
          $required[':input[name="request_type"]'][] = ['value' => 'question'];
        }
      }
      if ($config->get('show_field_street_complaint')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'complaint'];
        if ($config->get('mandatory_field_street_complaint')) {
          $required[':input[name="request_type"]'][] = ['value' => 'complaint'];
        }
      }
      if ($config->get('show_field_street_praise')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'praise'];
        if ($config->get('mandatory_field_street_praise')) {
          $required[':input[name="request_type"]'][] = ['value' => 'praise'];
        }
      }
      $form['contact_us_form']['contact']['street'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Street'),
        '#title_display' => 'invisible',
        '#attributes' => [
          'placeholder' => $this->t('Your Street'),
        ],
        '#states' => [
          'visible' => $visible,
          'required' => $required,
        ],
        '#rules' => [
          'length[20,255]',
        ],
      ];
    }
    if ($config->get('show_field_city_question') || $config->get('show_field_city_complaint') || $config->get('show_field_city_praise')) {
      $visible = [];
      $required = [];
      if ($config->get('show_field_city_question')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'question'];
        if ($config->get('mandatory_field_city_question')) {
          $required[':input[name="request_type"]'][] = ['value' => 'question'];
        }
      }
      if ($config->get('show_field_city_complaint')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'complaint'];
        if ($config->get('mandatory_field_city_complaint')) {
          $required[':input[name="request_type"]'][] = ['value' => 'complaint'];
        }
      }
      if ($config->get('show_field_city_praise')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'praise'];
        if ($config->get('mandatory_field_city_praise')) {
          $required[':input[name="request_type"]'][] = ['value' => 'praise'];
        }
      }
      $form['contact_us_form']['contact']['city'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Your City'),
        '#title_display' => 'invisible',
        '#attributes' => [
          'placeholder' => $this->t('City'),
        ],
        '#states' => [
          'visible' => $visible,
          'required' => $required,
        ],
        '#rules' => [
          'length[3,120]',
        ],
      ];
    }
    if ($config->get('show_field_zip_code_question') || $config->get('show_field_zip_code_complaint') || $config->get('show_field_zip_code_praise')) {
      $visible = [];
      $required = [];
      if ($config->get('show_field_zip_code_question')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'question'];
        if ($config->get('mandatory_field_zip_code_question')) {
          $required[':input[name="request_type"]'][] = ['value' => 'question'];
        }
      }
      if ($config->get('show_field_zip_code_complaint')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'complaint'];
        if ($config->get('mandatory_field_zip_code_complaint')) {
          $required[':input[name="request_type"]'][] = ['value' => 'complaint'];
        }
      }
      if ($config->get('show_field_zip_code_praise')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'praise'];
        if ($config->get('mandatory_field_zip_code_praise')) {
          $required[':input[name="request_type"]'][] = ['value' => 'praise'];
        }
      }
      $form['contact_us_form']['contact']['zipcode'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Zip code'),
        '#title_display' => 'invisible',
        '#attributes' => [
          'placeholder' => $this->t('Postal code'),
        ],
        '#states' => [
          'visible' => $visible,
          'required' => $required,
        ],
        '#maxlength' => 40,
      ];
    }
    if ($config->get('show_field_country_question') || $config->get('show_field_country_complaint') || $config->get('show_field_country_praise')) {
      $visible = [];
      $required = [];
      $selectedCountries = [];
      $selectedCountry = "";

      if ($config->get('show_field_country_question')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'question'];
        if ($config->get('mandatory_field_country_question')) {
          $required[':input[name="request_type"]'][] = ['value' => 'question'];
        }
      }
      if ($config->get('show_field_country_complaint')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'complaint'];
        if ($config->get('mandatory_field_country_complaint')) {
          $required[':input[name="request_type"]'][] = ['value' => 'complaint'];
        }
      }
      if ($config->get('show_field_country_praise')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'praise'];
        if ($config->get('mandatory_field_country_praise')) {
          $required[':input[name="request_type"]'][] = ['value' => 'praise'];
        }
      }

      $countriesList = DsuEngageController::getCountries();
      $market = strtoupper($config->get('dsu_engage_api_market'));
      $country = strtoupper($config->get('dsu_engage_api_country'));
      if ($market !== 'GLOBAL') {
        $selectedCountries = DsuEngageController::getMarketCountries($market);
        $selectedCountry = strtoupper($country);
      }
      else {
        $selectedCountry = strtoupper($selectedCountries[0]);
      }

      $marketCountry = DsuEngageController::getCountryByAcronym($country);
      if (empty($marketCountry) || $market === 'GLOBAL' || $market === '') {
        $selectedCountry = "GLOBAL";
        $required = FALSE;
        $visible = FALSE;
      }

      if (!$countriesList) {
        $required = FALSE;
      }

      if (count($selectedCountries) > 1 || $market === 'GLOBAL' || $market === '') {
        $selectedCountry = "0";
      }

      if ($config->get('show_field_state_question') || $config->get('show_field_state_complaint') || $config->get('show_field_state_praise')) {
        $form['contact_us_form']['contact']['country'] = [
          '#type' => 'select',
          '#title' => $this->t('Country'),
          '#title_display' => 'before',
          '#prefix' => '<div class="row t"><div class="col-xs-6">',
          '#suffix' => '</div>',
          '#options' => $countriesList,
          '#default_value' => $country,
          '#ajax' => [
            'event' => 'change',
            'callback' => '::getStatesAjax',
            'wrapper' => 'states',
          ],
          '#states' => [
            'visible' => $visible,
            'required' => $required,
          ],
        ];
      }
      else {
        $form['contact_us_form']['contact']['country'] = [
          '#type' => 'select',
          '#title' => $this->t('Country'),
          '#title_display' => 'before',
          '#prefix' => '<div class="col-xs-6 v">',
          '#suffix' => '</div></div>',
          '#options' => $countriesList,
          '#default_value' => $country,
          '#states' => [
            'visible' => $visible,
            'required' => $required,
          ],
        ];
      }
    }
    if ($config->get('show_field_state_question') || $config->get('show_field_state_complaint') || $config->get('show_field_state_praise')) {
      $visible = [];
      $required = [];

      if ($config->get('show_field_state_question')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'question'];
        if ($config->get('mandatory_field_state_question')) {
          $required[':input[name="request_type"]'][] = ['value' => 'question'];
        }
      }
      if ($config->get('show_field_state_complaint')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'complaint'];
        if ($config->get('mandatory_field_state_complaint')) {
          $required[':input[name="request_type"]'][] = ['value' => 'complaint'];
        }
      }
      if ($config->get('show_field_state_praise')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'praise'];
        if ($config->get('mandatory_field_state_praise')) {
          $required[':input[name="request_type"]'][] = ['value' => 'praise'];
        }
      }

      $selectedStates = DsuEngageController::getStatesByCountry($selectedCountry);
      $form['contact_us_form']['contact']['state'] = [
        '#type' => 'select',
        '#title' => $this->t('State'),
        '#title_display' => 'before',
        '#prefix' => '<div id="states" class="col-xs-6">',
        '#suffix' => '</div></div></div>',
        '#options' => isset($form['contact_us_form']['contact']['country']) ? $selectedStates : [],
        '#default_value' => '',
        '#states' => [
          'visible' => $visible,
          'required' => $required,
        ],
      ];
    }
    if ($config->get('show_field_attachments_question') || $config->get('show_field_attachments_complaint') || $config->get('show_field_attachments_praise')) {
      $visible = [];
      $required = [];
      if ($config->get('show_field_attachments_question')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'question'];
        $required = $config->get('mandatory_field_attachments_question');
      }
      if ($config->get('show_field_attachments_complaint')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'complaint'];
        $required = $config->get('mandatory_field_attachments_complaint');
      }
      if ($config->get('show_field_attachments_praise')) {
        $visible[':input[name="request_type"]'][] = ['value' => 'praise'];
        $required = $config->get('mandatory_field_attachments_praise');
      }
      $validators = [
        'file_validate_size' => [4.3 * 1024 * 1024],
        'file_validate_extensions' => [
          'xps pdf doc docx rtf txt xls xlsx csv bmp png jpeg jpg',
        ],
      ];

      // Add our upload validator to the widget, only if the
      // file_upload_secure_validator service is available.
      if (\Drupal::hasService('file_upload_secure_validator')) {
        $validators['file_upload_secure_validator_upload_validate'] = [];
      }
      $form['contact_us_form']['attachment'] = [
        '#type' => 'details',
        '#title' => $this->t('Attachments'),
        '#open' => TRUE,
        '#states' => [
          'visible' => $visible,
        ],
      ];
      $form['contact_us_form']['attachment']['files'] = [
        '#type' => 'managed_file',
        '#preview' => TRUE,
        '#title' => $this->t('Upload files'),
        '#description' => $this->t("You can upload up to 9 files.<br/>The maximum size of each file is 4.3MB.<br/>Allowed file types: xps pdf doc docx rtf txt xls xlsx csv bmp png jpeg jpg"),
        '#upload_validators' => $validators,
        '#required' => $required,
        '#multiple' => TRUE,
        '#states' => [
          'visible' => $visible,
          'required' => $required,
        ],
      ];
    }

    if (!empty($config->get('dsu_engage_additional_footer_enable'))) {
      $form['contact_us_form']['campaign'] = [
        '#type' => 'markup',
        '#markup' => $config->get('dsu_engage_additional_footer_notes') . ' <a href="tel:' . $config->get('dsu_engage_additional_footer_contact') . '">' . $config->get('dsu_engage_additional_footer_contact') . '</a>',
        '#prefix' => '<p><b>Note: </b>',
        '#suffix' => '</p>',
      ];
    }

    $form['contact_us_form']['customer_consent'] = [
      '#type' => 'checkbox',
      '#name' => 'customer_consent',
      '#title' => $this->t('I agree to Nestlé processing my personal data as set out in the <a target="_blank" title="Nestlé Privacy Notice" href="https://www.nescafe.com/privacy-policy">Nestlé Privacy Notice</a>.'),
    ];

    $form['contact_us_form']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return $form;
  }

  public function getStatesAjax($form, FormStateInterface $form_state) {

    $states = [];
    if ($form_state->getValue('country') !== '0') {
      $states = DsuEngageController::getStatesByCountry($form_state->getValue('country'));
    }

    $form['contact_us_form']['contact']['state'] = [
      '#type' => 'select',
      '#title' => $this->t('State'),
      '#title_display' => 'before',
      '#prefix' => '<div id="states" class="col-xs-6">',
      '#suffix' => '</div></div></div>',
      '#options' => $states ?: [0 => 'No states available'],
      '#default_value' => 0,
      '#states' => $form['contact_us_form']['contact']['state']['#states'],
      '#validated' => TRUE,
    ];

    return $form['contact_us_form']['contact']['state'];
  }

  public function setRequiredField(array &$form, FormStateInterface &$form_state) {
    if ($form_state->getValue('preferredChannel') == "phone") {
      $form['contact_us_form']['contact']['phone']['#attributes']['placeholder'] = $this->t('Phone *');
    }
    else {
      $form['contact_us_form']['contact']['phone']['#attributes']['placeholder'] = $this->t('Phone');
    }
    $form_state->setRebuild(TRUE);

    return $form['contact_us_form']['contact']['phone'];
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->configFactory->get('dsu_engage.settings');
    $language = \Drupal::languageManager()->getCurrentLanguage()->getName();
    $market = strtoupper($config->get('dsu_engage_api_market'));
    $countryName = DsuEngageController::getCountryByAcronym($form_state->getValue('country'));

    $uploadedFiles = $form_state->getValue('files');

    //Managing attachment
    $attachedFiles = [];
    if ($uploadedFiles) {
      foreach ($uploadedFiles as $uploadedFile) {
        $fileLoaded = $this->entityTypeManager->getStorage('file')
          ->load($uploadedFile);
        $fileContents = file_get_contents($fileLoaded->getFilename());
        $fileEncoded = base64_encode($fileContents);
        $attachedFiles[] = [
          'attachmentName' => $fileLoaded->getFilename(),
          'attachmentBody' => $fileEncoded,
        ];
      }
    }
    if (!$form_state->hasAnyErrors()) {
      switch ($form_state->getValue('request_type')) {
        case "question":
          $requestType = "Question/Suggestion";
          break;
        case "complaint":
          $requestType = "Complaint";
          break;
        case "praise":
          $requestType = "Compliment";
          break;
      }

      $prefixesList = DsuEngageController::getPhonePrefixes();
      $prefix = $form_state->getValue('phone_prefix') ? $form_state->getValue('phone_prefix') : "";
      $phone_new = $form_state->getValue('phone') ? $prefix . $form_state->getValue('phone') : "";
      $phonearr = explode("~", $phone_new);
      $phone = $phonearr[1];

      $data = [
        "brand" => $config->get('dsu_engage_api_brand'),
        "market" => $market,
        "country" => $countryName,
        "language" => $language,
        "consumerContactOrigin" => $config->get('dsu_engage_api_contact_origin'),
        "requestType" => $requestType,
        "firstName" => ucfirst($form_state->getValue('firstName')),
        "lastName" => ucfirst($form_state->getValue('lastName')),
        "email" => $form_state->getValue('email'),
        "street" => $form_state->getValue('street'),
        "zipCode" => $form_state->getValue('zipcode'),
        "city" => $form_state->getValue('city'),
        "state" => $form_state->getValue('state'),
        "description" => $form_state->getValue('description'),
        "preferredChannel" => ucfirst($form_state->getValue('preferredChannel')),
        "phone" => $phone,
        "attachments" => $attachedFiles,
        "barCode" => $form_state->getValue('barcode'),
        "batchCode" => $form_state->getValue('batchcode'),
        "productDescription" => $form_state->getValue('product_description'),
        "JSONRequestId" => $form_state->getValue('form_build_id'),
      ];

      if ($form_state->getValue('request_type') == "complaint") {
        $data["bestBeforeDate"] = $form_state->getValue('bestBeforeDate') ? $form_state->getValue('bestBeforeDate') : NULL;
      }

      $token = DsuEngageController::dsuEngageGetToken();

      if (!$token['access_token']) {
        drupal_set_message($this->t('The access token is wrong. Your request was not sent to our contact system.'), 'error');
        $form_state->setRebuild();
      }

      $options = [
        'method' => 'POST',
        'json' => $data,
        'headers' => [
          'Content-Type' => 'application/json',
          'Authorization' => 'Bearer ' . $token['access_token'],
        ],
      ];

      $response = DsuEngageController::dsuEngageHttpRequest(
        $config->get('dsu_engage_api_endpoint_url'),
        $options
      );

      $responseOk = $response->getStatusCode() === 200;
      $responseData = Json::decode(Json::decode($response->getBody()));

      if ($responseData['status'] === 'failure') {
        drupal_set_message($responseData['ErrorMessage'], 'error');
        $form_state->setRebuild();
      }

      if ($responseOk && $responseData['status'] !== 'failure') {
        // Confirmation message
        $request_type = $form_state->getValue('request_type');
        $event_label = (($request_type == 'question') ? 'question' : (($request_type == 'complaint') ? 'complaint' : (($request_type == 'praise') ? 'praise' : '')));
        $formatted_message = new FormattableMarkup(
          '<div id = "engage-success" data-eventlabel = "@event_label">Your ticket is created. Your contact number is: @ticket
			 </div>',
          [
            '@event_label' => $event_label,
            '@ticket' => $responseData['caseNumber'],
          ]
        );
        drupal_set_message(t(' @message', ['@message' => $formatted_message]));

      }
    }

  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {

    $config = $this->configFactory->get('dsu_engage.settings');
    $selectedTab = $form_state->getValue('request_type');
    $description = $form_state->getValue('description');
    $emailaddress = trim($form_state->getValue('email'));
    $phone = trim($form_state->getValue('phone'));
    $lastName = trim($form_state->getValue('lastName'));
    $firstName = trim($form_state->getValue('firstName'));
    $selectedCountry = $form_state->getValue('country');
    $uploadedFiles = $form_state->getValue('files');
    $bestBeforeDate = $form_state->getValue('bestBeforeDate');
    $productDescription = $form_state->getValue('product_description');
    $barCode = $form_state->getValue('barcode');
    $batchCode = $form_state->getValue('batchcode');
    $street = $form_state->getValue('street');
    $city = $form_state->getValue('city');
    $zipcode = $form_state->getValue('zipcode');
    $state = $form_state->getValue('state');
    $preferredChannel = $form_state->getValue('preferredChannel');
    $customer_term_conditions = $form_state->getValue('customer_consent');

    // Validate Product information.
    if ($selectedTab === 'question' || $selectedTab === 'complaint' || $selectedTab === 'praise') {
      $required_product_description = $config->get('mandatory_field_product_description_' . $selectedTab);
      $required_batch_code = $config->get('mandatory_field_batch_code_' . $selectedTab);
      $required_bar_code = $config->get('mandatory_field_bar_code_' . $selectedTab);
      $required_data = $config->get('mandatory_field_best_before_date_' . $selectedTab);
      if ($description === "") {
        $form_state->setErrorByName('description', $this->t('Please enter your message.'));
      }
      if ($required_product_description && $productDescription === "") {
        $form_state->setErrorByName('product_description', $this->t('Please enter a product description.'));
      }
      if ($required_batch_code && $batchCode === "") {
        $form_state->setErrorByName('batchcode', $this->t('Please enter a Batch code.'));
      }
      if ($required_bar_code && $barCode === "") {
        $form_state->setErrorByName('barcode', $this->t('Please enter a Bar code.'));
      }
      if ($required_data && $bestBeforeDate === "") {
        $form_state->setErrorByName('bestBeforeDate', $this->t('Please enter data.'));
      }
      if ($bestBeforeDate != NULL) {
        if (!$this->validateDate($bestBeforeDate, 'Y-m-d')) {
          $form_state->setErrorByName('bestBeforeDate', $this->t('Please enter a valid date.'));
        }
      }
    }
    if ($firstName === "") {
      $form_state->setErrorByName('firstName', $this->t('The field "First Name" is missing.'));
    }
    if ($firstName && !preg_match('/^\p{L}+$/u', $firstName)) {
      $form_state->setErrorByName('firstName', $this->t('The field "First Name" only accepts text.'));
    }
    if ($lastName && !preg_match('/^\p{L}+$/u', $lastName)) {
      $form_state->setErrorByName('lastName', $this->t('The field "Last Name" only accepts text.'));
    }
    if ($lastName === "") {
      $form_state->setErrorByName('lastName', $this->t('The field "Last Name" is missing.'));
    }
    if ($preferredChannel == 'email' && $emailaddress == '') {
      $form_state->setErrorByName('email', $this->t('Please enter an email address.'));
    }
    else {
      if (!empty($emailaddress) && !$this->emailValidator->isValid($emailaddress)) {
        $form_state->setErrorByName('email', $this->t('%emailaddress is an invalid email address.', ['%emailaddress' => $emailaddress]));
      }
    }
    if ($preferredChannel == 'phone' && $phone == '') {
      $form_state->setErrorByName('phone', $this->t('Please enter a phone number.'));
    }
    if ($phone && !ctype_digit($phone)) {
      $form_state->setErrorByName('phone', $this->t('The field "Phone" only accepts numeric characters.'));
    }

    // Validate contact information.
    if ($selectedTab === 'question' || $selectedTab === 'complaint' || $selectedTab === 'praise') {
      $required_street = $config->get('mandatory_field_street_' . $selectedTab);
      $required_city = $config->get('mandatory_field_city_' . $selectedTab);
      $required_zipcode = $config->get('mandatory_field_zip_code_' . $selectedTab);
      $required_state = $config->get('mandatory_field_state_' . $selectedTab);
      $required_attachment = $config->get('mandatory_field_attachments_' . $selectedTab);
      if ($required_street && $street === "") {
        $form_state->setErrorByName('street', $this->t('Please enter a street.'));
      }
      if ($required_city && $city === "") {
        $form_state->setErrorByName('city', $this->t('Please enter a city.'));
      }
      if ($required_zipcode && $zipcode === "") {
        $form_state->setErrorByName('zipcode', $this->t('Please enter a zipcode.'));
      }
      if ($required_state && $state === "0") {
        $form_state->setErrorByName('state', $this->t('Please select a state.'));
      }
    }
    if ($selectedCountry === "0") {
      $form_state->setErrorByName('country', $this->t('Please select a country.'));
    }
    if (count($uploadedFiles) > 10) {
      $form_state->setErrorByName('files', $this->t('The number of files uploaded exceed the maximum of 10 files allowed.'));
    }

    if (!$customer_term_conditions) {
      $form_state->setErrorByName('customer_consent', $this->t('Please accept Nestle terms & condtions.'));
    }
  }

  public function validateDate($myDateString) {
    return (bool) strtotime($myDateString);
  }
}
