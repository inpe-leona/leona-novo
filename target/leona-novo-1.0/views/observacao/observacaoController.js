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
                    var mes = dataAgora.getMonth() + 1;
                    if (mes < 10) {
                        mes = "0" + mes;
                    }
                    var dia = dataAgora.getDate();
                    if (dia < 10) {
                        dia = "0" + dia;
                    }
                    dataAgora = "" + dataAgora.getFullYear() + mes + dia + dataAgora.getHours() + dataAgora.getMinutes();
                    console.log("- " + dataAgora);
                    retorno.forEach(function (item) {
                        if (item.diaInicio < 10) {
                            item.diaInicio = "0" + item.diaInicio;
                        }
                        var dataObsInicio = "" + item.anoInicio + item.mesInicio + item.diaInicio + item.horaInicio + item.minInicio;
                        if (item.diaFim < 10) {
                            item.diaFim = "0" + item.diaFim;
                        }
                        var dataObsFim = "" + item.anoFim + item.mesFim + item.diaFim + item.horaFim + item.minFim;
                        if (dataObsFim < dataAgora) {
                            $scope.realizadas.push(item);
                        } else {
                            if (dataObsInicio < dataAgora) {
                                $scope.andamento.push(item);
                            } else {
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

    $scope.iniciarObservacao = function (estacao) {
        localStorage.setItem('estacaoObs', JSON.stringify(estacao));
    }
});

app.controller('TransmissaoCtrl', function ($rootScope, $location, $scope, observacaoService, $timeout) {
    $rootScope.activetab = $location.path();
    $scope.estacao = JSON.parse(localStorage.getItem('estacaoObs'));
    $scope.acoes = true;
    $scope.respostaAcoes = '';
    $scope.contagem = '';
    $scope.divBarra = false;
    var nomeWS = '';
    $scope.ipWS = '';
    var acao = {
        graus: '',
        movimento: '',
        usuario: '',
        datahora: '',
        emailusuario: '',
        idobservacao: ''
    };
    $scope.listaAcoes = [];

    if ($scope.estacao.estacao === 'São José dos Campos') {
        nomeWS = 'saojose';
        $scope.sjc = true;
        $scope.cuiaba = false;
        $scope.eusebio = false;
        $scope.fraiburgo = false;
    }
    if ($scope.estacao.estacao === 'Cuiabá') {
        nomeWS = 'cuiaba';
        $scope.sjc = false;
        $scope.cuiaba = true;
        $scope.eusebio = false;
        $scope.fraiburgo = false;
    }
    if ($scope.estacao.estacao === 'Fraiburgo') {
        nomeWS = 'fraiburgo';
        $scope.sjc = false;
        $scope.cuiaba = false;
        $scope.eusebio = false;
        $scope.fraiburgo = true;
    }
    if ($scope.estacao.estacao === 'Eusébio') {
        nomeWS = 'eusebio';
        $scope.sjc = false;
        $scope.cuiaba = false;
        $scope.eusebio = true;
        $scope.fraiburgo = false;
    }

    var wsUri = 'ws://' + document.location.host + '/leona-novo/' + nomeWS;
    var webSocket = new WebSocket(wsUri);
    webSocket.binaryType = 'arraybuffer';
    webSocket.onmessage = function (evt) {
        onMessage(evt);
    };
    webSocket.onerror = function (evt) {
        onError(evt);
    };

    function preencherObjeto(graus, mov) {
        acao = new Object();
        var data = new Date();
        var dia = data.getDate();
        var mes = data.getMonth() + 1;
        var hora = data.getHours();
        var min = data.getMinutes();
        if (dia < 10) {
            dia = '0' + dia;
        }
        if (mes < 10) {
            mes = '0' + mes;
        }
        if (hora < 10) {
            hora = '0' + hora;
        }
        if (min < 10) {
            min = '0' + min;
        }
        acao.graus = graus;
        acao.movimento = mov;
        acao.datahora = dia + '/' + mes + '/' + data.getFullYear() + ' ' + hora + ':' + min;
        acao.usuario = JSON.parse(localStorage.getItem('usuarioLogado')).nome + ' ' + JSON.parse(localStorage.getItem('usuarioLogado')).sobrenome;
        acao.idobservacao = $scope.estacao.id;
        acao.emailusuario = JSON.parse(localStorage.getItem('usuarioLogado')).email;
    }
    ;

    $scope.buscarLogsSalvos = function () {
        observacaoService.buscarLogsSalvos($scope.estacao.id)
                .success(function (retorno) {
                    $scope.listaAcoes = retorno.reverse();
                });
    };

    function preencherLista(acao) {
        $scope.listaAcoes.reverse();
        $scope.listaAcoes.push(acao);
        $scope.listaAcoes.reverse();
        $scope.$digest();
    }


    $scope.progress = 0;
    $scope.isRunning = false;
    $scope.tempo;

    var DOTS = '....................................................................................................';
    var PIPES = '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||';
    var isRunning = true;

    $scope.progress_bar = function () {
        return '[' + PIPES.substring(0, $scope.progress) + DOTS.substring(0, 100 - $scope.progress) + ']'
    }

    function tick() {
        if ($scope.progress < 100) {
            $scope.progress++;
            $timeout(tick, $scope.tempo);
            $scope.isRunning = true;
        } else {
            $scope.isRunning = false;
        }
    }



    $scope.ligarCamera = function () {
        $scope.divBarra = true;
        $scope.acoes = false;
        $scope.respostaAcoes = "LIGANDO CÂMERA...";
        preencherObjeto('', 'Ligar');
        acao = JSON.stringify(acao);
        webSocket.send(acao);
        preencherObjeto('0', 'Azimute');
        acao = JSON.stringify(acao);
        webSocket.send(acao);
        preencherObjeto('0', 'Elevação');
        acao = JSON.stringify(acao);
        webSocket.send(acao);
        $scope.progress = 0;
        $scope.tempo = 100;
        $timeout(tick, 0);
        setTimeout(function () {
            $scope.acoes = true;
            $scope.respostaAcoes = '';
            preencherObjeto('', 'Ligar');
            acao = JSON.stringify(acao);
            preencherLista(JSON.parse(acao));
            $scope.divBarra = false;
        }, 10000);
    };

    $scope.desligarCamera = function () {
        $scope.divBarra = true;
        $scope.acoes = false;
        $scope.respostaAcoes = "DESLIGANDO CÂMERA...";
        preencherObjeto('', 'Desligar');
        acao = JSON.stringify(acao);
        webSocket.send(acao);
        $scope.progress = 0;
        $scope.tempo = 100;
        $timeout(tick, 0);
        setTimeout(function () {
            $scope.acoes = true;
            $scope.respostaAcoes = '';
            preencherLista(JSON.parse(acao));
            $scope.divBarra = false;
        }, 10000);
    };

    $scope.resetarCamera = function () {
        $scope.divBarra = true;
        $scope.acoes = false;
        $scope.respostaAcoes = "RESETANDO...";
        preencherObjeto('', 'Resetar');
        acao = JSON.stringify(acao);
        webSocket.send(acao);
        $scope.progress = 0;
        $scope.tempo = 300;
        $timeout(tick, 0);
        setTimeout(function () {
            preencherObjeto('0', 'Elevação');
            acao = JSON.stringify(acao);
            webSocket.send(acao);
            setTimeout(function () {
                $scope.acoes = true;
                $scope.respostaAcoes = '';
                preencherObjeto('', 'Resetar');
                acao = JSON.stringify(acao);
                preencherLista(JSON.parse(acao));
                $scope.divBarra = false;
            }, 15000);
        }, 15000);
    };

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    $scope.moverAzimute = function () {
        if (($scope.valorAzimute === undefined) || ($scope.valorAzimute === null) || ($scope.valorAzimute === '')) {
            $scope.respostaAcao = 'Digite o valor de azimute';
        } else {
            if (isNumber($scope.valorAzimute)) {
                if (parseInt($scope.valorAzimute) > 350) {
                    $scope.respostaAcao = 'Valor Azimute excedeu o limite!';
                } else {
                    $scope.divBarra = true;
                    $scope.acoes = false;
                    $scope.respostaAcoes = "MOVENDO AZIMUTE...";
                    preencherObjeto($scope.valorAzimute, 'Azimute');
                    acao = JSON.stringify(acao);
                    webSocket.send(acao);
                    $scope.progress = 0;
                    $scope.tempo = 200;
                    $timeout(tick, 0);
                    setTimeout(function () {
                        $scope.acoes = true;
                        $scope.respostaAcoes = '';
                        preencherLista(JSON.parse(acao));
                        $scope.respostaAcao = '';
                        $scope.divBarra = false;
                    }, 20000);
                }
            } else {
                $scope.respostaAcao = 'Digite apenas números';
            }
        }
    };

    $scope.moverElevacao = function () {
        if (($scope.valorElevacao === undefined) || ($scope.valorElevacao === null) || ($scope.valorElevacao === '')) {
            $scope.respostaAcao = 'Digite o valor de elevação';
        } else {
            if (isNumber($scope.valorElevacao)) {
                if ((parseInt($scope.valorElevacao) < -35) || (parseInt($scope.valorElevacao) > 35)) {
                    $scope.respostaAcao = 'Valor Elevação excedeu o limite';
                } else {
                    $scope.divBarra = true;
                    $scope.acoes = false;
                    $scope.respostaAcoes = "MOVENDO ELEVAÇÃO...";
                    $scope.valorElevacao = parseInt($scope.valorElevacao) * -1;
                    preencherObjeto("" + $scope.valorElevacao, 'Elevação');
                    acao = JSON.stringify(acao);
                    webSocket.send(acao);
                    $scope.progress = 0;
                    $scope.tempo = 200;
                    $timeout(tick, 0);
                    setTimeout(function () {
                        $scope.acoes = true;
                        $scope.respostaAcoes = '';
                        $scope.valorElevacao = parseInt($scope.valorElevacao) * -1;
                        preencherObjeto("" + $scope.valorElevacao, 'Elevação');
                        acao = JSON.stringify(acao);
                        preencherLista(JSON.parse(acao));
                        $scope.respostaAcao = '';
                        $scope.divBarra = false;
                    }, 20000);
                }
            } else {
                $scope.respostaAcao = 'Digite apenas números';
            }
        }
    };

    function onMessage(evt) {
        console.log('recebido: ' + evt.data);
        preencherLista(JSON.parse(evt.data));
    }

    function onError(evt) {
        console.log('erro: ' + evt.data);
    }
})