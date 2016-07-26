app.controller('EstacaoCtrl', function($rootScope, $location, $scope)
{
    $rootScope.activetab = $location.path();
    $scope.detalhesEstacao = true;
    
    $scope.buscarEstacoes = function(){
        $scope.estacoes = ['Cuiabá','Eusébio','Fraiburgo','São José dos Campos'];
    }
    $scope.fecharDetalhesEstacao = function(){
        $scope.detalhesEstacao = false;
    }
});