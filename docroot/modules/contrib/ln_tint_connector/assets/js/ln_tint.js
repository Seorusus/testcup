/**
 * @file
 *   Javascript for the adding event tracking from datalayer.
 */

(function ($) {
	// Check Tint is exist on any content type.
	if($(".tint-social").length > 0) {
		// Get title of the node.
		var content_title = $(".tint-social").data("eventlabel");
		dataLayer.push({
			event:"viewUGC",
			eventCategory:"UGC",
			eventAction:"View UGC",
			eventLabel:content_title
		})	
    }

})(jQuery);
