var dataFactoryFn = function($http) {
    return $http.get('app/data/data.json');
};

mainModule.factory('dataFactory', ['$http', dataFactoryFn]);