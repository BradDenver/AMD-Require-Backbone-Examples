// Require.js allows us to configure shortcut alias
require.config({

	// urlArgs appends a get var to each script to stop browser caching
	// during dev use the _dev version to never cache
	// during prod use the _v version to cache at version level
	urlArgs: "_d=" + (new Date()).getTime(), //dev
	//urlArgs: "_v=1", //production

	//the root path for all module lookups
	baseUrl: "modules",

	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		'underscore': {
			exports: '_'
		},

		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},

		'bootstrap': {
			deps: ['jquery']
		},

		'prettify': { }
	},

	// paths are relative to baseUrl
	paths: {
		jquery: '../vendorAssets/libs/jquery',
		bootstrap: '../vendorAssets/mixed/bootstrap/js/bootstrap.min',
		underscore: '../vendorAssets/libs/underscore-min',
		backbone: '../vendorAssets/libs/backbone-min',
		text: '../vendorAssets/libs/require/text',
		prettify: '../vendorAssets/mixed/google-code-prettify/prettify'
	}

});

'use strict';

require([
	'backbone',
	'text!../navbar.html',
	'text!../menu.html',
	'bootstrap',
	'prettify'
], function(Backbone, navbar, menuTemplate){

	var navMenu = $('body').attr('data-navMenu');
	var tmpl = _.template(navbar);
	$('body').prepend(tmpl({navMenu: navMenu}));

	var templates = [];
    var els = [];

	_.each($('[data-template]'), function(el){

        var templateName = $(el).attr('data-template');

        templates.push('text!'+navMenu+'/templates/'+templateName+'.html');
        els.push(templateName);

    }, this);

    //prettyPrint() must only be called once and must be after templates have loaded
    if(templates.length){
		require(templates, function(){
			for (var i = 0; i < arguments.length; i++) {
				$('[data-template="'+els[i]+'"]').html(_.template(angleBracketsToHtmlCode(arguments[i])));
			}
			prettyPrint();
			buildMenu();
		});
    } else {
		prettyPrint();
		buildMenu();
    }

    function buildMenu(){
		var menus = [];
		_.each($('section[id]'), function(section){

			var subMenus = [];

			_.each($(section).find('h2[id]'), function(h2){
				subMenus.push({label: $(h2).text(), id: $(h2).attr('id')});
			});

			menus.push({label: $(section).find('h1').text(), id: $(section).attr('id'), subMenus: subMenus});

		}, this);

		var template = _.template(menuTemplate);
		$('.sidebarNav').html(template({menus: menus}));

		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this).scrollspy('refresh');
		});
    }

    function angleBracketsToHtmlCode(str) {
		str = str.replace(new RegExp(['<'],"g"), "&lt;");
		str = str.replace(new RegExp(['>'],"g"), "&gt;");

		return str;
	}

	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-35387810-1']);
	_gaq.push(['_trackPageview']);

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
});