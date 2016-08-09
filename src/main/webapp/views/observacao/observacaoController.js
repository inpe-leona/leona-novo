app.controller('ObservacaoCtrl', function ($rootScope, $location, $scope, estacaoService, observacaoService)
{
    $rootScope.activetab = $location.path();
    $scope.divCadastroObservacao = false;
    $scope.botaoNovaObservacao = true;
    $scope.botaoSalvarObservacao = true;
    $scope.obsFuturas = false;
    $scope.obsRealizadas = false;
    $scope.obsAndamento = false;
    $scope.futuras = [];
    $scope.realizadas = [];
    $scope.andamento = [];
    $scope.dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    $scope.meses = [
        {nome: "Janeiro", valor: "01"},
        {nome: "Fevereiro", valor: "02"},
        {nome: "Março", valor: "03"},
        {nome: "Abril", valor: "04"},
        {nome: "Maio", valor: "05"},
        {nome: "Junho", valor: "06"},
        {nome: "Julho", valor: "07"},
        {nome: "Agosto", valor: "08"},
        {nome: "Setembro", valor: "09"},
        {nome: "Outubro", valor: "10"},
        {nome: "Novembro", valor: "11"},
        {nome: "Dezembro", valor: "12"}
    ]
    $scope.anos = [new Date().getFullYear(), new Date().getFullYear() + 1];
    $scope.horas = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    $scope.minutos = [];
    for (var m = 0; m <= 59; m++) {
        var n = m;
        if (n < 10) {
            n = '0' + n;
        }
        $scope.minutos.push('' + n);
    }

    $scope.observacaoCadastro = {
        estacao: '',
        diaInicio: '',
        mesInicio: '',
        anoInicio: '',
        diaFim: '',
        mesFim: '',
        anoFim: '',
        horaInicio: '',
        horaFim: '',
        minInicio: '',
        minFim: ''
    }

    $scope.fecharDivNovaObservacao = function () {
        $scope.divCadastroObservacao = false;
        $scope.botaoNovaObservacao = true;
    }

    $scope.abrirDivNovaObservacao = function () {
        $scope.divCadastroObservacao = true;
        $scope.botaoNovaObservacao = false;
    }

    $scope.retornarEstacoes = function () {
        estacaoService.buscarEstacoes()
                .success(function (retorno) {
                    $scope.estacoes = retorno;
                });
    };

    $scope.retornarObservacoesFuturas = function () {
        observacaoService.retornarObservacoesFuturas()
                .success(function (retorno) {
                    console.log(retorno);
                })
    };
    
    $scope.retornarObservacoesRealizadas = function () {
        observacaoService.retornarObservacoesRealizadas()
                .success(function (retorno) {
                    var dataAgora = new Date();
                    var mes = dataAgora.getMonth()+1;
                    if (mes<10){mes = "0"+mes;}
                    var dia = dataAgora.getDate();
                    if (dia<10){dia = "0"+dia;}
                    dataAgora = ""+dataAgora.getFullYear()+mes+dia+dataAgora.getHours()+dataAgora.getMinutes();
                    console.log("- "+dataAgora);
                    retorno.forEach(function(item){
                        if (item.diaInicio<10){item.diaInicio = "0"+item.diaInicio;}
                        var dataObsInicio = ""+item.anoInicio+item.mesInicio+item.diaInicio+item.horaInicio+item.minInicio;
                        if (item.diaFim<10){item.diaFim = "0"+item.diaFim;}
                        var dataObsFim = ""+item.anoFim+item.mesFim+item.diaFim+item.horaFim+item.minFim;
                        if (dataObsFim<dataAgora){
                            $scope.realizadas.push(item);
                        }else{
                            if (dataObsInicio<dataAgora){
                                $scope.andamento.push(item);
                            }else{
                                $scope.futuras.push(item);
                            }
                        }
                    });
                });
    };
    
    $scope.retornarObservacoesAndamento = function () {
        observacaoService.retornarObservacoesAndamento()
                .success(function (retorno) {
                    console.log(retorno);
                })
    };

    $scope.salvarObservacao = function () {
        $scope.respostaCadastroObservacao = "AGUARDE...";
        $scope.botaoSalvarObservacao = false;
        $scope.observacaoCadastro['usuarioCriador'] = $scope.usuarioLogado.email;
        observacaoService.salvarObservacao($scope.observacaoCadastro)
                .success(function (retorno) {
                    if (retorno.status == 1) {
                        $scope.respostaCadastroObservacao = retorno.resposta;
                    } else {
                        $scope.divCadastroObservacao = false;
                        $scope.obsFuturas = true;
                        $scope.obsRealizadas = false;
                        $scope.obsAndamento = false;
                        location.reload();
                    }
                    $scope.botaoSalvarObservacao = true;

                });
    };

    $scope.divRealizadas = function () {
        $scope.obsFuturas = false;
        $scope.obsRealizadas = true;
        $scope.obsAndamento = false;
    };
    $scope.divFuturas = function () {
        $scope.obsFuturas = true;
        $scope.obsRealizadas = false;
        $scope.obsAndamento = false;
    };
    $scope.divAndamento = function () {
        $scope.obsFuturas = false;
        $scope.obsRealizadas = false;
        $scope.obsAndamento = true;
    };
});