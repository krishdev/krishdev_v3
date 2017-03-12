var navHeaderTmpFn = function ($scope, CONSTANTS, $location, $timeout) {
	function init() {
		$scope.headerTemplate = CONSTANTS.HEADER_TEMPLATE;
	}
	init();
	var pathName = $location.url();

	$scope.$on('$routeChangeStart', function (next, current) {
		pathName = $location.url();
		$timeout(function () {
			angular.element("nav .navbar-nav li").removeClass("active");
			angular.element("nav li a[href='#" + pathName + "']").closest("li").addClass("active");

		}, 100);
	});
};

navModule.controller('headerNavCtrl', ['$scope', 'APP_CONSTANTS', '$location', '$timeout', navHeaderTmpFn]);
