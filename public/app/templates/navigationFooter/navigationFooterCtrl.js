var navFooterFn = function($scope, CONSTANTS) {
    function init() {
        $scope.footerTemplate = CONSTANTS.FOOTER_TEMPLATE;
    }
    init();
}

navFooter.controller('navFooterCtrl', ['$scope', 'APP_CONSTANTS', navFooterFn]);