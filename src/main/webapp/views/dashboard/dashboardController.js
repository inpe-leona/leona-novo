app.controller('DashboardCtrl', function($rootScope, $location, $scope)
{
    $rootScope.activetab = $location.path();
    
    
});