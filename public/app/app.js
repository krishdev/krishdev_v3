var mainModule = angular.module('mainModule', ['ngSanitize', 'navModule', 'navFooter', 'common', 'ngRoute', 'ui.bootstrap', 'backToTop']);
mainModule.config(['$routeProvider',
    function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/partials/home.html',
				controller: 'aboutMeCtrl',
				controllerAs: 'abtMeCtrl'
			})
			.when('/aboutMe', {
				templateUrl: 'app/partials/aboutme.html',
				controller: 'aboutMeCtrl',
				controllerAs: 'abtMeCtrl'
			})
			.when('/myproject', {
				templateUrl: 'app/partials/myproject.html',
				controller: 'aboutMeCtrl',
				controllerAs: 'abtMeCtrl'
			})
			.when('/myEducation', {
				templateUrl: 'app/partials/myEducation.html',
				controller: 'aboutMeCtrl',
				controllerAs: 'abtMeCtrl'
			})
			.when('/contact', {
				templateUrl: 'app/partials/contactMe.html',
				controller: 'aboutMeCtrl',
				controllerAs: 'abtMeCtrl'
			})
			.when('/editor', {
				templateUrl: 'app/partials/editor.html',
				controller: 'editorCtrl',
				controllerAs: 'eCtrl'
			})
			.when('/explore/:id', {
				templateUrl: 'app/partials/explorer.html',
				controller: 'exploreCtrl',
				controllerAs: 'exCtrl'
			})
			.when('/explore', {
				templateUrl: 'app/partials/exploreMaterials.html',
				controller: 'materialCtrl',
				controllerAs: 'mCtrl'
			})
			.when('/login', {
				templateUrl: 'app/partials/login.html',
				controller: 'loginCtrl',
				controllerAs: 'lCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
    }
]);
mainModule.run(function ($rootScope) {
	$rootScope.setUserDetails = "";
});
