var ctrlFunction = function ($scope, $rootScope, $timeout, contentService, $routeParams) {
	$scope.explorer = {};
	$scope.contents = [];
	var itemId = $routeParams.id;

	var getItem = function (id) {
		contentService.findOneData('/api/getOneContent', {
			'itemId': id
		}).then(function (response) {
			if (response && response.data) {

				$scope.explorer = response.data;
				$scope.explorer.time = new Date().getTime();
				$scope.explorer.tag = $scope.explorer.tag.split(",");
			}
		}, function errorCallBack(response) {
			console.log(response.data);
		});
	};
	var init = function () {
		contentService.getAllData('/api/getAllData').then(function (response) {
			if (response && response.data)
				$scope.contents = response.data;
		});
	};
	init();
	getItem(itemId);
};

mainModule.controller('exploreCtrl', ['$scope', '$rootScope', '$timeout', 'contentService', '$routeParams', ctrlFunction]);
