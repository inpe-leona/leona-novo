app.controller('UsuarioCtrl', function($rootScope, $location)
{
    $rootScope.activetab = $location.path();
});