var app = angular.module('leona', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider)
{
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix(['!']);
    $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/usuario', {
                templateUrl: 'views/usuario/usuario.html',
                controller: 'UsuarioCtrl'
            })
            .when('/estacao', {
                templateUrl: 'views/estacao/estacao.html',
                controller: 'EstacaoCtrl'
            })
            .when('/observacao', {
                templateUrl: 'views/observacao/observacao.html',
                controller: 'ObservacaoCtrl'
            })
            .when('/imagem', {
                templateUrl: 'views/imagem/imagem.html',
                controller: 'ImagemCtrl'
            })
            .when('/meusdados', {
                templateUrl: 'views/meusdados/meusdados.html',
                controller: 'MeusDadosCtrl'
            })
            .otherwise({redirectTo: '/'});
});

app.controller('leonaController', function($scope){    
    $scope.mostrarUsuarioLogado = function(){
        $scope.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    }
})