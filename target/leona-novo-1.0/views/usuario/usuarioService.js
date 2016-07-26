app.service('usuarioService', function ($http) {
        return{
            buscarUsuarios: function(){
                return $http.get('/leona-novo/rest/usuario/buscarUsuarios');
            },
            mudarStatusUsuario: function(email){
                return $http.get('/leona-novo/rest/usuario/mudarStatusUsuario/'+email);
            }
        }
    })