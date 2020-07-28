1 - About Alkemics 

	Alkemics is an intuitive platform that helps retailers and brands manage, collaborate and share product data in one place

2 - FEATURES

	o URL, Market, Lenguage & User configurable
	o Migration of all Products of a specific market to local
	o Creation of a Cotent-type to store dsu_product, with Paragraphs and Taxonomies integrated
	o UI for Packets of Products requested, cron syncronization and the time where cron will be executed.

3 - INSTALLATION

	3.1 REQUIREMENTS
		- Paragraphs, Entity Revision, Video embed field modules
		- API KEY needed
		- Entity Brawoser
		- Guzzle


	3.2 PROCESS

		1 -  Install de module and it's dependencies as usual.

		2 -  Please configure the module UI and test the connection to the Alkemics in /admin/config/ln_alkemics/config

		4 -  Once the connection test has passed, please proceed with the manual importation (in /admin/config/ln_alkemics/importer). It will increase the performance.

	3.3 CUATION

		1 - The importation procees may need specific server (php) configuration, to avoid timeout, and memomry limit, depending on the market and on the server configuration (not usual)

4 - CONFIGURATION

	1 - The configuration it's setted in Configuration->Alkemics Configuration->Lightnest Alkemics 

	2 - CONFIGURE THE SERVER CALL TO Alkemics URL endpoints

		Set the parameters, ask to the Nestle Digital Hub to get it

	3 - CONFIGURE SYNCHRONIZATION PROCESS IN YOUR WEBSITE

		Set on the checkbox to active the Cron Proces. Without this options, there recipes will not be syncronize periodically.

		Set the time where this process will be executed. (PLEASE NOTE; that the recipe search already has a syncronization feature, making this process more periodically we will improve the search feature performance)


5 - UNINSTALLATION

	To uninstall the module, be aware that the content type dsu_product and it's content are erased from the site.
