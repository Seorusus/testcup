Lightnest Data Layer
====================
**Get page meta data from inside Drupal out to the client-side.**

This Drupal module outputs various CMS page meta data (like content type, author uid, taxonomy terms), which can be used for all kinds of front-end features. This works for all entity types and is easy to extend with hooks.

The phase "lightnest data layer" is a Google term, but it's a great standard for your server to setup a foundation for the front-end. 
It's generic enough that other services managed in GTM can use application data, also you can use this data on your site to implement great client-side features, like anonymous user tracking, etc.



## Meta data output
It's critial to have easy and reliable JS access to the meta data about the pages of your site. This modules helps output that info. Yes, you could get some of this from the DOM, but that's messy. Configure what gets pushed out via the admin page. This includes global control over all entity properties. You can also control if taxonomy should be inluded, and which vocabularies should be exposed. Here's _some_ of what's available by default...
```json
{
  "drupalLanguage": "en",
  "userStatus": "anonymous",
  "userUid": "555",
  "entityId" : "123",
  "entityLabel" : "My Cool Page",
  "entityType" : "node",
  "entityBundle" : "article",
  "entityUid" : "555",
  "entityLanguage" : "en",
  "entityTaxonomy" : {
    "special_category" : {
      "25" : "Term Name",
      "26" : "Another Term"
    },
    "my_type" : {
      "13" : "Some Tag",
      "14" : "Another Tag"
    }
  }
}
```

## Adding to the data layer
- Hook alter to add more component json in header.
