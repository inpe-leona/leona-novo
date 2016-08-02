app.controller('DashboardCtrl', function($rootScope, $location, $scope,estacaoService)
{
    $rootScope.activetab = $location.path();
    
    $scope.buscarEstacoesDashboard = function () {
        estacaoService.buscarEstacoes()
                .success(function(retorno){
                    $scope.estacoes = retorno;
        });
    };
});