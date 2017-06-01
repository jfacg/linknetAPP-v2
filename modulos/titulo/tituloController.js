(function () {
    angular.module('linknetApp').controller('TituloController', [
        '$http',
        'tabsTitulo',
        'toastr',
        'UrlFactory',
        'DecodeFactory',
        TituloController
    ]);

    function TituloController($http, tabsTitulo, toastr, UrlFactory, DecodeFactory) {
        const vm = this;
        const url = UrlFactory;
        const urlTitulos = `${url}/titulo`
        const urlUsuario = `${url}/usuario`
        const urlCobranca = `${url}/cobranca`
        const decoded = DecodeFactory.decode()


        vm.refresh = function () {
          tabsTitulo.show(vm, { tabList: true })
          vm.titulo = {}
          vm.titulos = []
          vm.titulosVencidos = []
          vm.usuarios = []
          vm.cobranca = {}
          $http.get(urlTitulos).then(function (response) {
              vm.titulos = response.data;
              vm.qtVencidos = 0
              vm.titulos.forEach(function (obj) {
                obj.datavenc = moment(obj.datavenc).format()
                  vm.qtVencidos ++
                  let urlCobrancaTitulo = `${url}/cobranca/titulo/${obj.titulo}`
                  $http.get(urlCobrancaTitulo).then(function (response) {

                    if (!response.data[0]) {
                      vm.titulosVencidos.push(obj)
                    }
                  })

              })
          })

          $http.get(urlUsuario).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].excluido === 'N') {
                vm.usuarios.push(response.data[i].nome)
              }
            }
          })
        }

        vm.agendar = function () {
          vm.cobranca.usuario = decoded.usuario
          vm.cobranca.dataRegistro = new Date()
          $http.post(urlCobranca, vm.cobranca).then(function (response) {
            toastr.success('Operação realizada com sucesso!!', 'Success')
            vm.refresh()
          }).catch(function (response) {
            toastr.error(response.data.errors, 'Error')
          })
        }

        vm.create = function () {
            vm.caixa.nome = nomeCaixa(vm.caixa.mes, vm.caixa.ano);
            $http.post(urlCaixa, vm.caixa).then(function (response) {
                toastr.success('Operação realizada com sucesso!!', 'Success')
                vm.refresh();
            }).catch(function (response) {
                toastr.error(response.data.errors, 'Error');
            });
        };

        vm.update = function () {
            vm.caixa.nome = nomeCaixa(vm.caixa.mes, vm.caixa.ano)
            const updateUrl = `${urlCaixa}/${vm.caixa._id}`
            $http.put(updateUrl, vm.caixa).then(function (response) {
                toastr.success('Operação realizada com sucesso!!', 'Success')
                vm.refresh()
            }).catch(function (response) {
                toastr.error(response.data.errors, 'Error');
            });
        };

        vm.delete = function () {
            const deleteUrl = `${urlCaixa}/${vm.caixa._id}`
            $http.delete(deleteUrl).then(function (response) {
                toastr.success('Operação realizada com sucesso!!', 'Success')
                vm.refresh()
            }).catch(function (response) {
                toastr.error(response.data.errors, 'Error');
            })
        }

        vm.tabsAgendar = function (titulo) {
            vm.cobranca.cliente = titulo.nome
            vm.cobranca.cpf_cnpj = titulo.cpf_cnpj
            vm.cobranca.endereco = `${titulo.endereco}, ${titulo.numero}`
            vm.cobranca.bairro = titulo.bairro
            vm.cobranca.contato = titulo.celular
            vm.cobranca.tipo = 'MENSALIDADE'
            vm.cobranca.valor = titulo.valor
            vm.cobranca.titulo = titulo.titulo
            vm.cobranca.dataVencimento = titulo.datavenc
            vm.cobranca.dataAgenda = titulo.dataAgenda
            vm.cobranca.observacao = titulo.observacao
            tabsTitulo.show(vm, { tabCreate: true })
        }

        vm.showTabDelete = function (caixa) {
            vm.caixa = caixa
            tabsTitulo.show(vm, { tabDelete: true })
        }

        vm.refresh()
    };
})()
