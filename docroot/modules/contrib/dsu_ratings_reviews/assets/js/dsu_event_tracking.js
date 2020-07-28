/**
 * @file
 *   Javascript for the adding event tracking from datalayer.
 */

(function ($) {
  // Check Rating & Reviews is exist on any content type.
  if($(".rating-review").length > 0) {
    // Call on submit drupal ratings & reviews form.
    $(document).on('click', '.js-form-wrapper .js-form-submit', function () {
      // Contain the value of the rating submitted by the user.
      var user_rating = $("#comment-form .fivestar-widget-static").find(".star .on").length;
      // Get content type of the node.
      var content_type = $(".rating-review").data("contentname");
      // Get title of the node.
      var content_name = $(".rating-review").data("eventlabel");
      dataLayer.push({
        event: "customEvent",
        eventCategory: "Ratings & Reviews",
        eventAction: "Rating or Review Published",
        eventLabel: content_name,
        contentName: content_type,
        reviewRating: user_rating,
        reviewSubmitted: 1
      });
    });
  }
})(jQuery);
