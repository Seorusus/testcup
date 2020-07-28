(function ($) {
  'use strict';

  Drupal.behaviors.card = {
    attach: function(context, settings) {}
  };

  var totalOverlay = $('.component-paragraph-field-item');
  var parentDiv = $('.component-paragraph-field');
  for (var i = 0; i < totalOverlay.length; i++) {
    var selectedBgColor = $(totalOverlay[i]).data('color');
    if( selectedBgColor == '' ){
      var selectedBgColor = $(parentDiv).data('color');
      $(totalOverlay[i]).css("color", selectedBgColor);
    }
    $(totalOverlay[i]).find('.hovercard-overlay').css("background", selectedBgColor);
    $(totalOverlay[i]).find('.hoverMicro > span').css("background", selectedBgColor); 
    $(totalOverlay[i]).find('.card-bottom-wrapper .card-bottom-text').css("background", selectedBgColor);
    $(totalOverlay[i]).find('.card-rollover-wrapper .card-rollover-text').css("background", selectedBgColor);
    $(totalOverlay[i]).find('.card-full-color-wrapper').css("background", selectedBgColor);

    var cardTitleOnImage = $('.card-title-on-image-wrapper');
    if(cardTitleOnImage != undefined)
      $(cardTitleOnImage[i]).find('.card-text-overlay').css("background", selectedBgColor);

    var hoverCardAnchor = $('.hover-card-box').find('.card-rollover-wrapper > a')[i];
    if(hoverCardAnchor != undefined)
      $(hoverCardAnchor).css("color", selectedBgColor); 
}

}(jQuery));

