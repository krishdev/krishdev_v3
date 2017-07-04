mainModule.controller('loginCtrl', function ($scope, $rootScope, loginService, $timeout, $location) {
	$scope.loginModel = {
		userName: '',
		password: ''
	};
	$scope.submitLogin = function () {
		var userDetails = {
			username: $scope.loginModel.userName,
			password: $scope.loginModel.password
		};
		if (userDetails.username && userDetails.password) {
			loginService.loginUser('/api/login', userDetails)
				.then(function (response) {
					if (response && response.data) {
						$rootScope.setUserDetails = response.data;
						if ($rootScope.setUserDetails.status._id)
							$location.path("/editor");

					}
					$scope.loginModel = {
						userName: '',
						password: ''
					};
				}, function errorCallBack(response) {
					console.log(response);
				});
		}
	};

});
mainModule.factory('loginService', function ($http) {
	return {
		loginUser: function (url, data) {
			return $http({
				method: 'POST',
				url: url,
				data: data
			})
		}
	}
});
