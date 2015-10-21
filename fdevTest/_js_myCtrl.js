app.controller('TheCountCtrl', function($scope, $http) {
    $http.get("count.json")
    .success(function (response) {$scope.theCount = response.records;});
});

app.controller('customersCtrl', function($scope, $http) {
    $http.get("top5.json")
    .success(function (response) {$scope.top5 = response.countries;});
});