## Lightnest Ratings & Reviews
This module help us to integrate Drupal Ratings & Reviews for product type in each node.

Description:
============
The Lightnest Ratings & Reviews module is a suite of modules that provide a wide range of integrations with the drupal ratings and reviews service.

Features:
============
1) Ratings & Reviews
2) Event Tracking From GTM

Usage:
======
- Showing Product ratings.
- Showing user reviews for product.

Installation:
=============

Installation of this module is just like any other Drupal module.

1) Go to drupal extend and enable the module.
2) Module is dependent on "Google Tag Manager" for event tracking.
2) Once enabled the module go to "DSU Product" content type manage field.
3) Make sure "HN Product Ratings and Reviews" field exist under the content type.
4) Go to manage display and enable "HN Product Ratings and Reviews" field.
8) Add ratings & review in node--dsu-product.html to show product ratings and star.
9) Create node in product node.
10) Save node form and Clear the cache.

Example:
- Show product ratings and stars.
````
 {% if content.field_hn_product_ratings_and_rev is defined %}
	<section class="grid-container rating-review" data-eventLabel="{{ node.label }}"
		data-contentName="{{ node.type.entity.label }}">
		{{ content.field_hn_product_ratings_and_rev }}
	</section>
 {% endif %}
 ````


Overriding:
==========

Need for extending this module just use default template and markup based on UI of product node.
