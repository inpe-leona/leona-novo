app.service('observacaoService', function ($http) {
        return{
            salvarObservacao: function(observacao){
                return $http.post('/leona-novo/rest/observacao/cadastrarObservacao', observacao);
            },
            retornarObservacoesFuturas: function(){
                return $http.get('/leona-novo/rest/observacao/retornarObservacoesFuturas');
            },
            retornarObservacoesRealizadas: function(){
                return $http.get('/leona-novo/rest/observacao/retornarObservacoesRealizadas');
            },
            retornarObservacoesAndamento: function(){
                return $http.get('/leona-novo/rest/observacao/retornarObservacoesAndamento');
            },
            buscarLogsSalvos: function(id){
                return $http.get('/leona-novo/rest/observacao/buscarLogsSalvos/'+id);
            }
        };
    });