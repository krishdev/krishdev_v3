mainModule.factory('postContact', function ($http) {
	return {
		postData: function (data) {
			return $http.post("/api/sendEmail", data);
		}
	}
});
