(function ($) {
  'use strict';

  Drupal.behaviors.accordionComponent = {
    attach: function(context, settings) {

        $('.accordion--text', context).once().click(function(e) {
            e.preventDefault();

            var $this = $(this);
            // As we can have more than one accordion we search the parent accordion.
            var $parent_accordion = $this.closest(".paragraph--type--accordion");

            // If click on open element should be closed.
            if ($this.parent().hasClass('status--enable')) {
                $this.parent().removeClass('status--enable');
                $this.next().slideUp();
            }
            // Clicking on closed element should open it and close others if
            // are open.
            else {
                // Remove the show class to all accordion components but
                // restore it to the depending element of the clicked title.
                $parent_accordion.find('.paragraph--type--accordion-item').removeClass('status--enable');
                $this.parent().addClass('status--enable');

                // Close all elements and open the depending element of the
                // clicked title.
                $parent_accordion.find('.paragraph--type--accordion-item:not(.status--enable) .accordion--components').slideUp();
                $this.next().slideToggle(400, function() {
                  scrollTop($this);
                });
            }
        });

        // All elements should be closed at the beginning.
        $('.accordion--components', context).hide();
    }
  };

  var scrollTop = function(target) {
    var menuHeight = $('header').height();
    var adminToolbar = $("#toolbar-bar");

    // Take into account the admin bars.
    if (adminToolbar.length > 0) {
      menuHeight = menuHeight + adminToolbar[0].scrollHeight;
    }

    $('html, body').animate(
      {
        // Take into account fixed menu height.
        scrollTop: target.offset().top - menuHeight
      },
      'slow',
      'swing'
    );
  }

}(jQuery));
