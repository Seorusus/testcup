/*******************************************************************************************/
/************************             SRH CONNECTOR             ***********************+****/
/*******************************************************************************************/

0 - ABOUT Smart Recipe Hub 

	Smart Recipe Hub (from now on SRH) it's the backend where recipes are stored. Each recipe have many tools, ingredients, macronutrients and steps. 

	The SRH have some search features, and we will use it in this module, when using de search feature.

	Recipes could be ordered by some parameters. Collections are groups or recipes (like summer, fresh, cold..) and Tags are other way to group it, like (breakfast, dinner). 

	In other hand, images have specific format and sizes. In our Drupal module we get de URL of the image in the CDN (images are locally) and store it, then we make diferents calls to the cdn dependenig on the screen type. (this feature doesn't work in SRH, it's a TODO)


1 - ABOUT SRH Connector

	Provides integration of Drupal Website to Smart Recipe Hub, and provide searchbox widget to acces to search engine provided by de SRH

	The proces will import and syncronize the recipes exisiting in the SRH depending on the market and endpoint configured in UI configuration. 

	The recipes and the entitys related to the recipes are stored in the new content-type Recipe. (Be careful of view display mode, could be unabled)

	The Search Feature, search directly to the SRH, (only use the local recipes when a recipe details it's accesed)

	The importation process could be configurable in the options menu. Otherwise, in every time-configurable cron process, the module will check if there are new, updated or unpublished recipes and import, update or unpublish it locally.

	The Search Feature also have a syncronization tool. If a recipe searched (remind that search feature works with SRH directly) it's not present locally, then the module import it. It will affect the performance (1 second per recipe to import in every search), but will mantain the website always syncronized to the SRH. 


2 - FEATURES

	o URL, Market, Lenguage & User configurable
	o Migration of all Recipes of a specific market to local
	o Creation of a Cotent-type to store Recipes, with Paragraphs and Taxonomies integrated
	o UI for Packets of recipes requested, cron syncronization and the time where cron will be executed
	o Search Box widget & Custom Search Block integrated with Block system
	o Specific search page in /recipes
	o UI for number of recipes showed by search feature, collection filter and multi-tag filter.
	o Custom basic temaplates




3 - INSTALLATION

	3.1 REQUIREMENTS
		- Paragraphs, Entity Revision, Video embed field modules
		- API KEY needed
		- DEVEL (ONLY IN DEV STAGE)


	3.2 PROCESS

		1 -  Install de module and it's dependencies as usual.

		2 -  Depending on yout site configuration (if you are using builder layaout app) your view entity form will be misconfigured, and the fields of the content type Recipe will be hidden. Please, enable this content-type and configure the labels as you want. Otherwise, to use it directly in twig temapltes engine the fields must be enabled.

		3 -  Please configure the module UI and test the connection to the SRH in /admin/config/dsu_srh/config

		4 -  Once the connection test has passed, please proceed with the manual importation (in /admin/config/dsu_srh/importer) before using the searchbox widget. It will increase the performance.

	3.3 CUATION

		1 - The importation procees may need specific server (php) configuration, to avoid timeout, and memomry limit, depending on the market and on the server configuration (not usual)

4 - CONFIGURATION

	1 - The configuration it's setted in Configuration->Webservices->SRH 

	2 - CONFIGURE THE SERVER CALL TO SMART RECIPE HUB URL

		Set the parameters, ask to the Nestle Digital Hub to get it

	3 - CONFIGURE SYNCHRONIZATION PROCESS IN YOUR WEBSITE

		The number set in this configuration it's the number of recipes call by second to the SRH. More recipes will increase the performance in the update process, but could stress the SRH server. Check with the Nestlé Digital Hub to ensure

		Set on the checkbox to active the Cron Proces. Without this options, there recipes will not be syncronize periodically.

		Set the time where this process will be executed. (PLEASE NOTE; that the recipe search already has a syncronization feature, making this process more periodically we will improve the search feature performance)

	4 - CONFIGURE THE SEARCH SERVICE

		Set collections and tags comma separated. TAGs can have one level of heriarchy. Usually site-builders will need only one level of herirachy, but, the SRH allows all this capabilities. Feel free to check it.

	5 - RECOMENDATIONS: 

		FRONT-END -> Expand the temaplates delivered

		The search feature, and the entitys imported have their own temapltes. Feel free to reuse it, or use a more specific temaplte name (to override it in specific cases, check drupal documentation)

		The ingredient entity, has attached a ingredient taxonomy, use it to sort or search locally by ingredients

		To modify the Search Feature form, please go to src/Form/RecipeSearch::BuildForm

5 - UNINSTALLATION

	To uninstall the module, be aware that the content type Recipe and it's content are erased from the site.



6 - ISSUES / TODO

	1 - PERFORMANCE ISSUES (ONLY AFFECT IN THE FIRST IMPORT PROCESS;

	 - Multhreding in http request it's implemented
	 - Save recipe when import it's the bottleneck
	 	- Propouses:
	 		- Nutritens entity consums 50% of time performance
	 			- Now every nutrient are a entity paragraph attached to a recipe
	 				- This allows admin to edit, organize and work with that entitys in the Drupal Way
	 			- Change it for key/value simple field, will improve the performance
	 		- Ingredients entitys consumes 30% of time performance
	 			- Now every ingredients are a Taxonomy field attached to a Paragraph entity attached to a Recipe
	 				- this allows admin to categorize recipes by ingredients out-of-the-box, and edit, organize and work with ingredients values
	 			- Construct it in a simple way will increase the performance, loosing this features

	2 - SERVER CONFIGURATION (ONLY AFFECT IN THE FRIST IMPORT PROCESS);

	 	- PHP Max allowed memory will be raised easily during the importation procees.
	 		In Cron Importation, Cron will import a specific number of recipes until this happends
	 			- Every cron, will import until all the recipes are imported.
	 		In manual importation, it's the same behaivour, buy manually.

	 	- It's hard recommended to set de PHP Memory 512MB to avoid it



