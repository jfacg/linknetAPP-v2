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
    const urlCredito = `${url}/credito`
    const decoded = DecodeFactory.decode()

    vm.refresh = function () {
      tabsCobranca.show(vm, { tabListFechados: true, tabListAbertos: true, tabCreate: true })
      vm.credito = {}
      vm.cobranca = {}
      vm.cobrancas = []
      vm.cobrancasAbertas = []
      vm.cobrancasFechadas = []
      vm.usuarios = []
      getLista()
      $http.get(urlCobranca).then(function (response) {
        vm.cobrancas = response.data
        for (var i = 0; i < vm.cobrancas.length; i++) {
          vm.cobrancas[i].dataAgenda = new Date(vm.cobrancas[i].dataAgenda)
          vm.cobrancas[i].dataVencimento = new Date(vm.cobrancas[i].dataVencimento)
          if (vm.cobrancas[i].baixado === 'N' && vm.cobrancas[i].excluido === 'N') {
            vm.cobrancasAbertas.push(vm.cobrancas[i])
          }
          if (vm.cobrancas[i].baixado === 'S' && vm.cobrancas[i].excluido === 'N') {
            vm.cobrancasFechadas.push(vm.cobrancas[i])
          }
        }
      })

      $http.get(urlUsuario).then(function (response) {
        vm.usuarios = response.data
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
        vm.cobranca.usuario = decoded.usuario

        vm.credito.tipo = vm.cobranca.tipo
        vm.credito.mes = vm.cobranca.mes
        vm.credito.descricao = vm.cobranca.descricao
        vm.credito.cliente = vm.cobranca.cliente
        vm.credito.valor = vm.cobranca.valor
        vm.credito.coletor = vm.cobranca.coletor
        vm.credito.repassado = 'S'
        vm.credito.observacao = vm.cobranca.observacao
        vm.credito.titulo = vm.cobranca.titulo
        vm.credito.dataVencimento = vm.cobranca.dataVencimento
        vm.credito.usuario = decoded.usuario
        vm.credito.dataBaixa = new Date()
      }

      const updateUrl = `${urlCobranca}/${vm.cobranca._id}`
      $http.put(updateUrl, vm.cobranca).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error')
      })

      $http.post(urlCredito, vm.credito).then(function(response) {
          toastr.success('Operação realizada com sucesso!!', 'Success')
          vm.refresh()
      }).catch(function(response) {
          toastr.error(response.data.errors, 'Error');
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
