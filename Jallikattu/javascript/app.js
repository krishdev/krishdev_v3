angular.module('blog', ['ngSanitize', 'ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('home', {
				url: "/",
				templateUrl: "javascript/views/home.html",
				controller: "homeCtrl as hCtrl"
			});
	})
	.controller('homeCtrl', ['$scope', '$timeout', 'fetchData', function ($scope, $timeout, fetchData) {
		var hCtrl = this;

		function getParameterByName(name, url) {
			if (!url) {
				url = window.location.href;
			}
			name = name.replace(/[\[\]]/g, "\\$&");
			var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " "));
		};
		var blogId = getParameterByName('id');
		fetchData.getData().success(function (response) {
			$scope.blogData = response;
			angular.forEach($scope.blogData, function (item) {
				if (!blogId) {
					$scope.post = item;
				}
				if (item.id == blogId)
					$scope.post = item;

			});
		})
	}])
	.factory('fetchData', function ($http) {
		return {
			getData: function () {
				return $http.get('javascript/data/posts.json');
			}
		};
	});
