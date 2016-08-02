app.controller('UsuarioCtrl', function ($rootScope, $location, $scope, usuarioService)
{
    var usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuario.tipo !== 'Administrador'){
        location.href = 'login.html';
    }
    $rootScope.activetab = $location.path();
    $scope.detalhesUsuario = false;

    $scope.buscarUsuarios = function () {
        usuarioService.buscarUsuarios()
                .success(function (retorno) {
                    $scope.usuarios = retorno;
                })
    }

    $scope.mudarStatusUsuario = function (usuario) {
        usuarioService.mudarStatusUsuario(usuario.email)
                .success(function (retorno) {
                    if (usuario.status=='Ativo'){
                        usuario.status = 'Inativo';
                    }else{
                        usuario.status = 'Ativo';
                    }
                })
    }
    $scope.verDetalhesUsuario = function (usuario) {
        $scope.usuarioDetalhe = usuario;
        $scope.detalhesUsuario = true;
    }
    $scope.fecharDetalhes = function () {
        $scope.detalhesUsuario = false;
    }
});