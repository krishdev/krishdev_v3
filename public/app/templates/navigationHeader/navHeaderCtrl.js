var navHeaderTmpFn = function($scope, CONSTANTS) {
    function init() {
        $scope.headerTemplate = CONSTANTS.HEADER_TEMPLATE;
    }
    init();
};

navModule.controller('headerNavCtrl', ['$scope', 'APP_CONSTANTS', navHeaderTmpFn]);