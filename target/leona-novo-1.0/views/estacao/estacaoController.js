app.controller('EstacaoCtrl', function($rootScope, $location, $scope)
{
    $rootScope.activetab = $location.path();
    $scope.divDetalhesEstacao = false;
    $scope.divCadastroEstacao = false;
    
    $scope.buscarEstacoes = function(){
        $scope.estacoes = ['Cuiabá','Eusébio','Fraiburgo','São José dos Campos'];
    }
    $scope.fecharDivDetalhesEstacao = function(){
        $scope.divDetalhesEstacao = false;
    }
    $scope.fecharDivNovaEstacao = function(){
        $scope.divCadastroEstacao = false;
    }
    $scope.abrirDivDetalhesEstacao = function(){
        $scope.divDetalhesEstacao = true;
    }
    $scope.abrirDivNovaEstacao = function(){
         $scope.divCadastroEstacao = true;
    }
});