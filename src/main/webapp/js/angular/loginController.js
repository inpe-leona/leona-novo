angular.module('loginController', [])
    .controller('loginController', function ($scope, loginService) {
        $scope.divcadastro = false;
        $scope.divlogin = true;
        $scope.botaoCadastro = true;

        $scope.login = {
            email:'',
            senha:''
        };
        $scope.usuario = {
            nome:'',
            sobrenome:'',
            email:'',
            senha:''
        };

        $scope.logarUsuario = function(){
            loginService.logarUsuario($scope.login)
                .success(function(retorno){
                    console.log(retorno);
                })
        };
        $scope.mudarAba = function(){
            $scope.divcadastro = !$scope.divcadastro;
            $scope.divlogin = !$scope.divlogin;
        };
        $scope.cadastrarUsuario = function(){
            $scope.respostaCadastro = "AGUARDE..."
            $scope.botaoCadastro = false;
            loginService.cadastrarUsuario($scope.usuario)
                .success(function(retorno){
                    if (retorno.status==1){
                        $scope.respostaCadastro = retorno.resposta;
                        $scope.botaoCadastro = true;
                    }else{                        
                        location.href = 'cadastrosucesso.html';
                    }
                })
        }
    })
