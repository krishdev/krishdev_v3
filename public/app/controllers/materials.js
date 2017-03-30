var ctrlFunction = function ($scope, $rootScope, $timeout, contentService, $routeParams) {
	$scope.contents = [];
	var init = function () {
		contentService.getAllData('/api/getAllData').then(function (response) {
			if (response && response.data) {

				$scope.contents = response.data;
				angular.forEach($scope.contents, function (item) {
					item.tag = item.tag.split(",");
				})
			}
		});
	};
	init();
};

mainModule.controller('materialCtrl', ['$scope', '$rootScope', '$timeout', 'contentService', '$routeParams', ctrlFunction]);
