var mainModule = angular.module('mainModule', ['navModule', 'navFooter', 'common', 'ngRoute', 'ui.bootstrap']);
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
			.otherwise({
				redirectTo: '/'
			});
    }
]);
