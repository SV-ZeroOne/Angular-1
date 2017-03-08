//controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    })
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
    
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",  {
    callback: "JSON_CALLBACK" }, {get: {method: "JSONP"}});
    $scope.apiKey = 'f4197b0b4f3ccf4c485ab7b98cd8e6e9';
                                             
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, APPID: $scope.apiKey});
    
    $scope.convertToCelsius = function(degK){
        return Math.round( degK - 273.15);
    };
    
    $scope.convertToDate = function(dt){
        return new Date(dt * 1000);
    }
    
}]);
