app.controller('DashboardCtrl', function($rootScope, $location)
{
    $rootScope.activetab = $location.path();
});