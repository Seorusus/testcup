<?php

namespace Drupal\dsu_ghostery\Filter;

use Drupal\Component\Render\MarkupInterface;

class GhosteryMarkupFilter implements MarkupInterface{

  //private $criticalCSS;


  public function __construct($markup){

    $this->markup =  $markup;

  }

  public function __toString() {
    return $this->markup ;
  }

  public function jsonSerialize() {
    return $this->__toString();
  }

}
