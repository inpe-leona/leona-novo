var app = angular.module('leona',['ngRoute']);

app.config(function($routeProvider, $locationProvider)
{
    var path = 'http://localhost:8084';
    var url = '/leona-novo';
    // remove o # da url
    $locationProvider.html5Mode(true);
    
    $routeProvider
        .when(url+'/dashboard', {
            templateUrl : path+url+'/dashboard/views/dashboard/dashboard.html',
            controller     : 'DashboardCtrl',
            
        })
        .when(url+'/dashboard/usuario', {
            templateUrl : path+url+'/dashboard/views/usuario/usuario.html',
            controller  : 'UsuarioCtrl'
        })
        .when(url+'/dashboard/estacao', {
            templateUrl : path+url+'/dashboard/views/estacao/estacao.html',
            controller  : 'EstacaoCtrl'
        })        
        .otherwise ({redirectTo : '/leona-novo/dashboard2'});
});