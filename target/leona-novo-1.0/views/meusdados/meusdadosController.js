app.controller('MeusDadosCtrl', function ($rootScope, $location, $scope, meusdadosService)
{
    $rootScope.activetab = $location.path();
    $scope.detalhesUsuarioLogado = true;
    $scope.editarUsuarioLogado = false;
    $scope.usuarioDetalhe = JSON.parse(localStorage.getItem('usuarioLogado'));

    $scope.editarDadosUsuarioLogado = function () {
        $scope.detalhesUsuarioLogado = false;
        $scope.editarUsuarioLogado = true;
    }

    $scope.editarMeusDados = function () {
        meusdadosService.editarMeusDados($scope.usuarioDetalhe)
                .success(function (retorno) {
                    if (retorno.status==1){
                        alert(retorno.resposta)
                    }else{
                        localStorage.setItem('usuarioLogado',JSON.stringify(retorno.map));
                        location.reload();
                    }                    
                })

    }
});