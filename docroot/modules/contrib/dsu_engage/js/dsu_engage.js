(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.behaviors.dsuEngageOptions = {
    attach: function (context, settings) {
      // Get list of prefix and change phone_prefix for selected country based.
      if (typeof drupalSettings.phone_prefix !== 'undefined') {
        var country = $('#edit-country').val();
        if (typeof country !== 'undefined' && country !== '0') {
          var phone = drupalSettings.phone_prefix[country];
          $("#edit-phone-prefix").val(phone);
        }
      }

      $('.questionbutton1', context).click(function () {
        $(this, context).addClass('active');
        $('.questionbutton2', context).removeClass('active');
        $('.questionbutton3', context).removeClass('active');
        $("label[for=edit-request-type-question]").click();

      });
      $('.questionbutton2', context).click(function () {
        $(this).addClass('active');
        $('.questionbutton1').removeClass('active');
        $('.questionbutton3').removeClass('active');
        $("label[for=edit-request-type-complaint]").click();

      });
      $('.questionbutton3', context).click(function () {
        $(this).addClass('active');
        $('.questionbutton1').removeClass('active');
        $('.questionbutton2').removeClass('active');
        $("label[for=edit-request-type-praise]").click();

      });
    }
  }


  try {

    var formCheck = function () {
      $('[data-drupal-states]').each(function () {
        var elem = this;
        if (typeof $(this).data('drupal-states').required === 'object') {

          $.each($(this).data('drupal-states').required, function (key, val) {
            let valueToCheck = [];
            let elmLabel = $('label[for="' + $(elem).attr('id') + '"]');

            $.each(val, function (index, data) { valueToCheck.push(data.value || data); });

            let selectedValue = false;

            switch ($(key).attr('type')) { case 'radio': selectedValue = $(key + ':checked').val(); break; default: selectedValue = $(key).val(); break; }

            var $input = elmLabel.closest('.form-group').find('[placeholder]');

            $(elem).closest('form').attr('novalidate', 'novalidate');

            if (selectedValue && valueToCheck.indexOf(selectedValue) !== -1) {
              elmLabel.text(elmLabel.text().replace(/^\s+|\s+\*|\s+$/g, '') + ' *');
              $input.attr('placeholder') && $input.attr('placeholder', $input.attr('placeholder').replace(/^\s+|\s+\*|\s+$/g, '') + ' *');
            } else {
              elmLabel.text(elmLabel.text().replace(/^\s+|\s+\*|\s+$/g, ''));
              $input.attr('placeholder') && $input.attr('placeholder', $input.attr('placeholder').replace(/^\s+|\s+\*|\s+$/g, ''));
            }
          });
        }
      });
    };

    $('body').on('change', '[name="request_type"]', function () {
      formCheck();
    });
    $(document).ready(function () {
      formCheck();
    });
  } catch (err) { window.console.log(err); }

  // bind tooltip

  try {
    $("[data-tool-tip]").each(function () {
      $(this).closest('.form-item').addClass('has-feedback')
        .prepend('<a href="" class="glyphicon glyphicon-question-sign form-control-feedback"></a>');
      $(this).attr('data-placement', "auto right").attr('title', $('.' + $(this).data('tool-tip')).prop('outerHTML'));
    });
    $('[data-tool-tip]').tooltip({ html: true });
  } catch (err) { }

  try {
    jQuery('.questionbuttons').removeClass('active').eq(jQuery('[name=request_type]:checked').closest('.form-item').index()).addClass('active');
  } catch(err){ }

  // Event tracking on engage form submission.
  if ($('#engage-success').length > 0) {
    var contactus_type = $("#engage-success").data("eventlabel");
    dataLayer.push({
      event: "contactUsEvent",
      eventCategory: "Contact Us",
      eventAction: "Contact Us Submitted",
      eventLabel: contactus_type
    });
  }
})(jQuery, Drupal, drupalSettings);
