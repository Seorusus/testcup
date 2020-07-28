------------------------
Lighnest DSU Gallery Slider
------------------------
DSU Gallery Slider can be used to create a slideshow of any paragraph content (not just images) that can use video also in slider. 

Powered by jQuery, it is heavily customizable: you may choose slideshow settings for each slider you will create.

Installation:
------------

1) Download the module and place it with other contributed modules
   (e.g. modules/contrib).

2) Enable the DSU Gallery module on the Modules list page.

3) Go to admin/structure/paragraphs_type. Check DSU Gallery Paragraph type should there after install the module.

4) Go to any content type and add Gallery paragraph uder entity reference or paragraph reference.

5) Go to that Node type page under crate a node form.

6) Fill the required detail and save the Node. Landing page should the slider for images or video.

Functionality:
-------------
* A title can be added.

* User can choose title position Left, right, top and bottom.

* User can select slider navigation format like dots, images and can be both.

* Thumbnail image and main image can be uploaded.

* Video URLs can be added.

* If Image and a URL are uploaded at the same item, only the video will be displayed.

* As many items as are needed can be added.

* Thumbnail image is a mandatory field.

* Image or Video URL must be added.

* Users can see a main image and thumbnail images underneath.

* When users click on a thumbnail, they can see it as the main image.

* Users can also play a video.

Extend
-------
 - Hook_theme_hook_alter for extending default template of Lightnest paragraph Tint.
 - Override default css libraries to change default UI/UX. 

