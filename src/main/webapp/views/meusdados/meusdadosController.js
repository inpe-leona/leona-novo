app.controller('MeusDadosCtrl', function($rootScope, $location)
{
    $rootScope.activetab = $location.path();
});