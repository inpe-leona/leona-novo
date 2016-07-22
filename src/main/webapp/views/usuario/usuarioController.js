app.controller('UsuarioCtrl', function ($rootScope, $location, $scope, usuarioService)
{
    $rootScope.activetab = $location.path();

    $scope.buscarUsuarios = function () {
        usuarioService.buscarUsuarios()
                .success(function (retorno) {
                    $scope.usuarios = retorno;
                })
    }
    
    $scope.mudarStatusUsuario = function(usuario){
        console.log('mudou');
    }
    $scope.detalhesUsuario = function(usuario){
        console.log('detalhes');
    }
});