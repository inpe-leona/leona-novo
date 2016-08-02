angular.module('loginService', [])
    .service('loginService', function ($http) {
        return{
            logarUsuario: function(usuario){
                return $http.post('/leona-novo/rest/usuario/logarUsuario',usuario);
            },
            cadastrarUsuario: function(usuario){
                return $http.post('/leona-novo/rest/usuario/cadastrarUsuario',usuario);
            },
            recuperarSenha: function(email){
                return $http.get('/leona-novo/rest/usuario/recuperarSenha/'+email);
            }
        }
    })