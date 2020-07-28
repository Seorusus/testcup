/**
 * @file
 */

(function ($, Drupal) {
  "use strict";

  var gallery = $('.paragraph--type--c-gallery')
    .wrap('<div class="dsu_gallery_wrapper"></div>'); // select gallery jquery ref and add a wrapper
  var config = gallery.data();
  if (config.navi !== 'dots') {
    var thumData = gallery.clone().removeClass('slide-for').addClass('slide-nav');
    thumData.find('li').html(function () {
      var img = $('<img>');
      img.attr('src', $(this).data('thumb'));
      return img;
    });

    thumData.find('.caption').remove(); // remove caption from thumbs
    thumData.insertAfter(gallery); // attach thumbdata to dom

    // add slider
    gallery.addClass('slide-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.paragraph--type--c-gallery.slide-nav'
    });

    $('.paragraph--type--c-gallery.slide-nav').on('init', function (event, slider) {

      var $slick_slides = $(event.target).find('.slick-slide');

      if ($slick_slides.length < 5 && config.navi === 'dots_images') {

        var dots = '';
        $slick_slides.each(function () {
          dots += '<li class="" aria-hidden="true" role="presentation" aria-selected="true" aria-controls="navigation10">' +
            '<button type="button" data-role="none" role="button" tabindex="-1">1</button>' +
            '</li>';
        });

        $(this).find('.slick-list').after('' + '<ul class="slick-dots custom-dots-slick" style="display: block; padding:0" role="tablist">' + dots + '</ul>');

        $(this).find('.custom-dots-slick li:eq(0)').addClass('slick-active');
        $(this).find('.custom-dots-slick li').click(function (event) {
          event.preventDefault();
          $(this).closest('.custom-dots-slick').find('.slick-active').removeClass('slick-active');
          $(this).addClass('slick-active');
          $(this).closest('.dsu_gallery_wrapper').find('.paragraph--type--c-gallery.slide-for').slick('slickGoTo', parseInt($(this).index()))
        });

        $slick_slides.click(function(){
          $(this).closest('.slide-nav').find('.custom-dots-slick .slick-active').removeClass('slick-active');
          $(this).closest('.slide-nav').find('.custom-dots-slick li').eq($(this).index()).addClass('slick-active');
        });
      }
    });

    // add thumb navigation as per config
    $('.paragraph--type--c-gallery.slide-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.paragraph--type--c-gallery.slide-for',
      dots: config.navi !== 'thumb',
      arrows: true,
      // centerMode: true,
      focusOnSelect: true
    });

  }
  else {
    gallery.addClass('slide-for');
    gallery.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true
    });
  }

  gallery.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('.slick-current iframe').attr('src', $('.slick-current iframe').attr('src'));
  })

})(jQuery, Drupal);
