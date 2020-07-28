<?php

  namespace Drupal\ln_bazaarvoice\Form;

  use DOMDocument;
  use Drupal\Core\Form\ConfigFormBase;
  use Drupal\Core\Form\FormStateInterface;
  use Drupal\Core\Url;
  use Drupal\media\Entity\Media;
  use Drupal\node\Entity\Node;
  use Drupal\taxonomy\Entity\Term;
  use Drupal\file\Entity\File;

  /**
   * Class BazaarvoiceAdminSettingsForm.
   *
   * @package Drupal\ln_bazaarvoice\Form
   */
  class ProductFeedAdminSettingsForm extends ConfigFormBase {

    /**
     * {@inheritdoc}
     */
    public function getFormId() {
      return 'ln_bazaarvoice_feed_admin_settings_form';
    }

    /**
     * {@inheritdoc}
     */
    protected function getEditableConfigNames() {
      return ['ln_bazaarvoice_feed.settings'];
    }

    /**
     * @param array $form
     * @param \Drupal\Core\Form\FormStateInterface $form_state
     *
     * @return array
     */
    public function buildForm(array $form, FormStateInterface $form_state) {
      $config = $this->config( 'ln_bazaarvoice_feed.settings' );
      $form = [];
      $form['actions'] = ['#type' => 'actions'];
      $form['actions']['close'] = [
        '#type' => 'submit',
        '#button_type' => 'primary',
        '#value' => $this->t( 'Download Product Feeds' ),
        '#weight' => -10,
      ];

      return $form;
    }

    /**
     * @param array $form
     * @param \Drupal\Core\Form\FormStateInterface $form_state
     */
    public function validateForm(array &$form, FormStateInterface $form_state) {
      // Test submitted locale codes are valid.
      parent::validateForm( $form, $form_state );
    }

    /**
     * @param array $form
     * @param \Drupal\Core\Form\FormStateInterface $form_state
     *
     * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
     * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
     */
    public function submitForm(array &$form, FormStateInterface $form_state) {
      // Set Header for download xml file.
      header( 'Content-disposition: attachment; filename="ProductFeed.xml"' );
      header( 'Content-type: "text/xml"; charset="utf8"' );

      // Initialize products feed example.
      $feeds = new DOMDocument( '1.0', 'UTF-8' );
      $feeds->preserveWhiteSpace = FALSE;
      $feeds->formatOutput = TRUE;
      /* create the root element of the xml tree */
      $xmlRoot = $feeds->createElement( "Feed" );
      /* append it to the document created */
      $xmlRoot = $feeds->appendChild( $xmlRoot );

      // Define Categories structure.
      $categories = $feeds->createElement( "Categories" );
      $categories = $xmlRoot->appendChild( $categories );
      // Get all category of product.
      $vid = 'dsu_category';
      $terms = \Drupal::entityTypeManager()
        ->getStorage( 'taxonomy_term' )
        ->loadTree( $vid );
      foreach ($terms as $term) {
        $category = $feeds->createElement( "Category" );
        $category = $categories->appendChild( $category );
        $category->appendChild( $feeds->createElement( 'ExternalId', $term->tid ) );
        $category->appendChild( $feeds->createElement( 'Name', $term->name ) );
      }

      // Getting Only Products.
      $nids = \Drupal::entityQuery( 'node' )
        ->condition( 'status', 1 )
        ->condition( 'type', 'dsu_product' )
        ->execute();

      // Products feed initialize.
      $products = $feeds->createElement( "products" );
      $products = $xmlRoot->appendChild( $products );
      if (isset( $nids )) {
        foreach ($nids as $nid) {
          // Product feed initialize.
          $product = $feeds->createElement( "product" );
          $product = $products->appendChild( $product );

          // Get all products node and load field values.
          $node = Node::load( $nid );
          $field_dsu_category = !empty( $node->get( 'field_dsu_category' )
            ->first() ) ? $node->get( 'field_dsu_category' )
            ->getValue()[0]['target_id'] : FALSE;
          if ($field_dsu_category) {
            $term = Term::load( $field_dsu_category );
            $field_dsu_category_name = $term->getName();
            // Get Product Categories.
            !empty( $field_dsu_category ) ? $product->appendChild( $feeds->createElement( 'CategoryExternalId', $field_dsu_category ) ) : '';
            !empty( $field_dsu_category ) ? $product->appendChild( $feeds->createElement( 'CategoryName', $field_dsu_category_name ) ) : '';
          }
          /* Get all product attributes and set in markup. */

          // Get Product Name.
          !empty( $node->getTitle( $node->getTitle() ) ) ? $product->appendChild( $feeds->createElement( 'Name', $node->getTitle() ) ) : '';

          //!empty( $node->get( 'field_dsu_product_desc' )->getString()) ? $product->appendChild( $feeds->createElement( 'Description', $node->get( 'field_dsu_product_desc' )->get(0)->getValue() ) ) : '';

          // Get Product ID.
          !empty( $node->id() ) ? $product->appendChild( $feeds->createElement( 'ExternalId', $node->id() ) ) : '';

          // Get Product Page URL.
          !empty( $node->id() ) ? $product->appendChild( $feeds->createElement( 'ProductPageUrl', $node->toUrl()
            ->setAbsolute()
            ->toString() ) ) : '';

          // Get Product ImageUrl.
          if (!empty( $node->get( 'field_product_image' )->first() )) {
            $file_id = $node->get( 'field_product_image' )
              ->getValue()[0]['target_id'];
            // Get media image load for url.
            $entity_image = Media::load( $file_id );
            if (!empty( $entity_image )) {
              $image_file_id = $entity_image->get( 'image' )
                ->first()
                ->get( 'target_id' )
                ->getString();
              // Check if image url is exist.
              $image_uri = get_file_uri( $image_file_id );
            }
            // Set xml markup attributes for image.
            $image_uri ? $product->appendChild( $feeds->createElement( 'ImageUrl', get_file_uri( $image_file_id ) ) ) : '';
          }

          // Get Product brand.
          !empty( $node->get( 'field_product_brand' )
            ->getValue() ) ? $product->appendChild( $feeds->createElement( 'Brand', $node->get( 'field_product_brand' )
            ->getString() ) ) : '';

        }
      }

      /* get the xml printed */
      $strxml = $feeds->saveXML();
      if (empty( $directory )) {
        $directory = 'sites/default/files';
      }
      // Save data in one file.
      $file = '/ProductFeed.xml';
      // Create and update same file.
      if ($file_create = @fopen( './' . $directory . $file, 'w' )) {
        fwrite( $file_create, $strxml );
        fclose( $file_create );
        readfile( './' . $directory . $file );
      }
      exit();
      parent::submitForm( $form, $form_state );
    }
  }
