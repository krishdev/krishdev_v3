mainModule.controller("registerCtrl",["$scope","$rootScope", "fetchData",function($scope,$rootScope, loginService) {
    $scope.submitRegistration = function(isValid) {
        //console.log(isValid);
        loginService.getData("/api/register",$scope.userDetails).then(function(result) {
            console.log("registered");
            console.log(result);
        });
    };
}]);