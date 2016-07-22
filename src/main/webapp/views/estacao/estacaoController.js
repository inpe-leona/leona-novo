app.controller('EstacaoCtrl', function($rootScope, $location)
{
    $rootScope.activetab = $location.path();
});