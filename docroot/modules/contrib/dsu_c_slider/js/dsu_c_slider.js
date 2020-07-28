/**
 * @file
 * Hook slick slider slick/js/slick.load.js
 */
(function ($, Drupal, drupalSettings) {

    'use strict';
    /**
       * Slick utility functions.
       *
       * @param {int} i
       *   The index of the current element.
       * @param {HTMLElement} elm
       *   The slick HTML element.
       */
    // function override(i, elm) {
    //     var t = $('> .slick__slider', elm).length ? $('> .slick__slider', elm) : $(elm);
    // }

    Drupal.behaviors.slickConfig = {
        attach: function (context) {
            // $('.slick', context).once('slick').each(override);
            window.onresize = function(event) {
                if($(".node-dsu-component-page-edit-form .paragraph--type--c-slider").length) {
                    var editLeftColumnWidth = $(".node-dsu-component-page-edit-form .layout-region-node-main").width();
                    $(".paragraph--view-mode--preview").css("width", (editLeftColumnWidth-72));
                }
            }
        }
    };

})(jQuery, Drupal, drupalSettings);