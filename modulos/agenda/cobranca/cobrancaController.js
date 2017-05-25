(function () {
  angular.module('linknetApp').controller('CobrancaController', [
    '$http',
    'tabsCobranca',
    'toastr',
    'UrlFactory',
    'DecodeFactory',
    CobrancaController
  ])

  function CobrancaController($http, tabsCobranca, toastr, UrlFactory, DecodeFactory) {
    const vm = this
    const url = UrlFactory
    const urlCobranca = `${url}/cobranca`
    const urlUsuario = `${url}/usuario`
    const decoded = DecodeFactory.decode()

    vm.refresh = function () {
      tabsCobranca.show(vm, { tabListFechados: true, tabListAbertos: true, tabCreate: true })
      vm.cobranca = {}
      vm.cobrancasAbertas = []
      vm.cobrancasFechadas = []
      vm.usuarios = []
      getLista()
      $http.get(urlCobranca).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].dataAgenda = new Date(response.data[i].dataAgenda)
          if (response.data[i].baixado === 'N' && response.data[i].excluido === 'N') {
            vm.cobrancasAbertas.push(response.data[i])
          }
          if (response.data[i].baixado === 'S' && response.data[i].excluido === 'N') {
            vm.cobrancasFechadas.push(response.data[i])
          }
        }
      })

      $http.get(urlUsuario).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].excluido === 'N') {
            vm.usuarios.push(response.data[i].nome)
          }
        }
      })
    }

    const getLista = function () {
      vm.listaTipo = ['MENSALIDADE', 'INSTALACAO']
    }

    vm.create = function () {
      vm.cobranca.usuario = decoded.usuario
      vm.cobranca.dataRegistro = new Date()
      $http.post(urlCobranca, vm.cobranca).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error')
      })
    }

    vm.delete = function () {
      const deleteUrl = `${urlCobranca}/${vm.agenda._id}`
      $http.delete(deleteUrl).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error')
      })
    }

    vm.update = function () {
      if (vm.cobranca.baixado === 'S') {
        vm.cobranca.dataBaixa = new Date()
      }
      const updateUrl = `${urlCobranca}/${vm.cobranca._id}`
      $http.put(updateUrl, vm.cobranca).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error')
        console.log(response.data.errors);

      })
    }

    vm.showTabUpdate = function (cobranca) {
      vm.cobranca = cobranca
      tabsCobranca.show(vm, { tabUpdate: true })
    }

    vm.showTabBaixa = function (cobranca) {
      vm.cobranca = cobranca
      tabsCobranca.show(vm, { tabBaixa: true })
    }

    vm.showTabDelete = function (cobranca) {
      vm.cobranca = cobranca
      tabsCobranca.show(vm, { tabDelete: true })
    }

    vm.showTabDelete = function (cobranca) {
      vm.cobranca = cobranca
      tabsCobranca.show(vm, { tabDelete: true })
    }

    vm.showVisualizar = function (cobranca) {
      vm.cobranca = cobranca
      tabsCobranca.show(vm, { tabVisualizar: true })
    }

    vm.voltar = function () {
      tabsCobranca.show(vm, {  tabListFechados: true, tabListAbertos: true, tabCreate: true  })
    }

    vm.refresh()
  }
})()
