------------------------
Lighnest TINT
------------------------
The Lightnest TINT module integrates the TINT social media feed service with Drupal.

TINT is a service that integrates all of your brand's social media posts in
one beautiful stream, perfect for embedding on your website.

Set up Lighnest TINT
--------------------

1) Visit the TINT website at https://www.tintup.com and create an account.

2) Add the TINT you would like to see in your feed.

3) Install & set up the TINT Drupal module, as described below.


Installation
------------

1) Download the module and place it with other contributed modules
   (e.g. modules/contrib).

2) Enable the Lightnest TINT module on the Modules list page.

3) Go to admin/structure/paragraphs_type. Check DSU Tint Paragraph type should there after install the module.

4) Go to any content type and add DSU Tint paragraph uder entity reference or paragraph reference.

5) Go to that Node type page under crate a node form.

6) Fill the required detail and save the Node. Landing page should reflect Tint Soical feeds.

Extend
-------
 - Hook_theme_hook_alter for extending default template of Lightnest paragraph Tint.
 - Override default css libraries to change default UI/UX. 

