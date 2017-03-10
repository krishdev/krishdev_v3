mainModule.factory('fetchData', function ($http) {
	return {
		getData: function (url, data) {
			return $http({
				method: 'GET',
				url: url,
				params: data
			});
		}
	}
});
