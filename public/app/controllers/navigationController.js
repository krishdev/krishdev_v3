var naviCtrlFn = function($scope, dataFactoryFn) {
    dataFactoryFn.then(function(response) {
        $scope.navHeader = response.data.navMenu;
    });

    $scope.displayContent = function(activeLink) {
        angular.forEach($scope.navHeader, function(item) {
            if (item.menu == activeLink) {
                item.cssClass = "active";
            } else item.cssClass = ":";

        });
    };
};

mainModule.controller('navigationCtrl', ['$scope', 'dataFactory', naviCtrlFn]);