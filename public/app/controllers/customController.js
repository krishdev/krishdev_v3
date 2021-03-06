var ctrlFunction = function ($scope, $rootScope, $timeout, contentService, $location) {
	var eCtrl = this;

	if (!$rootScope.setUserDetails && !$rootScope.setUserDetails.status)
		$location.path("/");
	$scope.content = {
		title: '',
		tags: ''
	};
	$scope.error = {
		missingElem: '',
		postError: ''
	};
	$scope.contents = [];

	var init = function () {
		contentService.getAllData('/api/getAllData').then(function (response) {
			if (response && response.data)
				$scope.contents = response.data;
		});
		contentService.getAllData('/api/getMessages').then(function (response) {
			if (response && response.data)
				$scope.messages = response.data;
		})
	};
	init();
	$scope.submitForm = function () {
		// get html data form the editor. .ql-editor
		var presentTime = new Date();
		var qlEditorHtml = angular.element(".ql-editor").html();
		var contentData;
		if ($scope.content.title && $scope.content.tags && qlEditorHtml.length) {
			contentData = {
				heading: $scope.content.title,
				content: qlEditorHtml,
				time: presentTime.getTime(),
				author: 'Krish',
				tag: $scope.content.tags,
				itemId: $scope.content.title.replace(/[^\w\s]/gi, '').split(" ").join("-")
			}
			contentService.insertData('/api/insertContent', contentData).then(function (response) {
				if (response.data._id) {

					//clearing up the fields for next use
					$scope.content = {
						title: '',
						tags: ''
					};
					$scope.error = {
						missingElem: '',
						postError: ''
					};
					angular.element(".ql-editor").html("");
				}
			})
		} else {
			$scope.error.missingElem = "Please enter all the fields";
		}

	};
	$scope.PreviewForm = function () {
		var presentTime = new Date();
		var qlEditorHtml = angular.element(".ql-editor").html();
		var contentData;
		if ($scope.content.title && $scope.content.tags && qlEditorHtml.length) {
			$scope.explorer = {
				heading: $scope.content.title,
				content: qlEditorHtml,
				time: presentTime.getTime(),
				author: 'Krish',
				tag: $scope.content.tags,
				itemId: $scope.content.title.split(" ").join("-")
			}
		}
	};
	$scope.EditContainer = function (item) {
		$scope.content.title = item.heading;
		$scope.content.tags = item.tag;
		angular.element(".ql-editor").html(item.content);
		$scope.editBtn = true;
		$scope.EditItem = item;
	};

	$scope.updateContent = function () {
		// get html data form the editor. .ql-editor
		var presentTime = new Date();
		var qlEditorHtml = angular.element(".ql-editor").html();
		var contentData;
		if ($scope.content.title && $scope.content.tags && qlEditorHtml.length) {
			contentData = {
				heading: $scope.content.title,
				content: qlEditorHtml,
				time: presentTime.getTime(),
				author: 'Krish',
				tag: $scope.content.tags,
				itemId: $scope.EditItem.itemId,
				_id: $scope.EditItem._id
			}
			contentService.updateData('/api/updateContent', contentData).then(function (response) {
				if (response.data.nModified === 1 || response.data.ok === 1) {

					//clearing up the fields for next use
					$scope.content = {
						title: '',
						tags: ''
					};
					$scope.error = {
						missingElem: '',
						postError: ''
					};
					angular.element(".ql-editor").html("");
				}
			}, function errorCallBack(response) {
				console.log(response);
			});
		} else {
			$scope.error.missingElem = "Please enter all the fields";
		}

	};

	$scope.viewMessage = function (message) {
		$scope.contMessage = message;
	};
};
mainModule.controller('editorCtrl', ['$scope', '$rootScope', '$timeout', 'contentService', '$location', ctrlFunction]);

mainModule.factory('contentService', function ($http) {
	return {
		insertData: function (url, data) {
			return $http({
				method: 'POST',
				url: url,
				params: data
			})
		},
		getAllData: function (url) {
			return $http({
				method: 'GET',
				url: url
			})
		},
		findOneData: function (url, id) {
			return $http({
				method: 'GET',
				url: url,
				params: id
			})
		},
		updateData: function (url, content) {
			return $http({
				method: 'POST',
				url: url,
				data: content
			})
		}
	}
});
