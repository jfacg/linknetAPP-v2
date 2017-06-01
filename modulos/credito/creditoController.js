(function() {
    angular.module('linknetApp').controller('CreditoController', [
        '$http',
        'tabsCredito',
        'toastr',
        'UrlFactory',
        'DecodeFactory',
        CreditoController
    ])

    function CreditoController($http, tabsCredito, toastr, UrlFactory, DecodeFactory) {
        const vm = this
        const url = UrlFactory;
        const urlCliente = `${url}/cliente`
        const urlUsuario = `${url}/usuario`
        const urlCredito = `${url}/credito`
        const decoded = DecodeFactory.decode()

        vm.refresh = function() {
            tabsCredito.show(vm, { tabList: true, tabCreate: true })
            vm.credito = {}
            vm.creditos = []
            vm.listaTipo = ['MENSALIDADE', 'INSTALACAO', 'VENDA']
            vm.listaMes = ['MAI/2017', 'JUN/2017', 'JUL/2017', 'AGO/2017', 'SET/2017', 'OUT/2017', 'NOV/2017', 'DEZ/2017']
            $http.get(urlCliente).then(function(response) {
              vm.clientes = response.data
            })
            $http.get(urlUsuario).then(function(response) {
              vm.usuarios = response.data
            })
            $http.get(urlCredito).then(function(response) {
              let data = response.data
              data.forEach((item) => {
                if (item.excluido === 'N') {
                  vm.creditos.push(item)
                }
              })
            })
        }

        vm.create = function() {
          vm.credito.usuario = decoded.usuario
          vm.credito.dataBaixa = new Date()
          $http.post(urlCredito, vm.credito).then(function(response) {
              toastr.success('Operação realizada com sucesso!!', 'Success')
              vm.refresh()
          }).catch(function(response) {
              toastr.error(response.data.errors, 'Error');
          })
        }

        vm.update = function() {
            const updateUrl = `${urlCredito}/${vm.credito._id}`
            $http.put(updateUrl, vm.credito).then(function(response) {
                toastr.success('Operação realizada com sucesso!!', 'Success')
                vm.refresh()
            }).catch(function(response) {
                toastr.error(response.data.errors, 'Error');
            })
        }

        vm.delete = function() {
            const deleteUrl = `${urlCredito}/${vm.credito._id}`
            $http.delete(deleteUrl).then(function(response) {
                toastr.success('Operação realizada com sucesso!!', 'Success')
                vm.refresh()
            }).catch(function(response) {
                toastr.error(response.data.errors, 'Error');
            })
        }

        vm.showTabUpdate = function(credito) {
          vm.credito = credito
          tabsCredito.show(vm, { tabUpdate: true })
        }

        vm.showTabDelete = function(credito) {
          vm.credito = credito
          tabsCredito.show(vm, { tabDelete: true })
        }

        vm.showTabVisualizar = function (credito) {
          vm.credito = credito
          tabsCredito.show(vm, { tabVisualizar: true })
        }

        vm.refresh()
    }

})()
