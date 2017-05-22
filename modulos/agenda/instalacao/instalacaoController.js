(function () {
  angular.module('linknetApp').controller('InstalacaoController', [
    '$http',
    'tabsInstalacao',
    'toastr',
    'UrlFactory',
    'DecodeFactory',
    InstalacaoController
  ])

  function InstalacaoController($http, tabsInstalacao, toastr, UrlFactory, DecodeFactory) {
    const vm = this
    const url = UrlFactory
    const urlInstalacao = `${url}/instalacao`
    const urlUsuario = `${url}/usuario`
    const urlMaterial = `${url}/material`
    const decoded = DecodeFactory.decode()
    vm.materiais = []
    vm.item = {}
    vm.quantidade = 0;

    vm.refresh = function () {
      tabsInstalacao.show(vm, { tabListFechados: true, tabListAbertos: true, tabCreate: true })
      vm.instalacao = {}
      vm.instalacoesAbertas = []
      vm.instalacoesFechadas = []
      vm.usuarios = []
      $http.get(urlInstalacao).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].dataAgenda = new Date(response.data[i].dataAgenda)
          if (response.data[i].baixado === 'N' && response.data[i].excluido === 'N') {
            vm.instalacoesAbertas.push(response.data[i])
          }
          if (response.data[i].baixado === 'S' && response.data[i].excluido === 'N') {
            vm.instalacoesFechadas.push(response.data[i])
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
      $http.get(urlMaterial).then(function (response) {
        vm.listaMateriais = response.data
      });
    }

    vm.getMaterial = function (id) {
      let urlMaterialPorId = `${urlMaterial}/${id}`
      $http.get(urlMaterialPorId).then(function (response) {
        vm.material = response.data
      });
    }

    vm.create = function () {
      vm.instalacao.usuario = decoded.usuario
      vm.instalacao.dataRegistro = new Date()
      $http.post(urlInstalacao, vm.instalacao).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error')
      })
    }

    vm.delete = function () {
      const deleteUrl = `${urlInstalacao}/${vm.agenda._id}`
      $http.delete(deleteUrl).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error')
      })
    }

    vm.update = function () {
      if (vm.instalacao.baixado === 'S') {
        vm.instalacao.dataBaixa = new Date()
      }
      const updateUrl = `${urlInstalacao}/${vm.instalacao._id}`
      $http.put(updateUrl, vm.instalacao).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error')
        console.log(response.data.errors);

      })
    }

    vm.materialAdd = function (idMaterial, quantidade) {
      tabsInstalacao.show(vm, { tabBaixa: true })
      let urlMaterialPorId = `${url}/material/${idMaterial}`
      $http.get(urlMaterialPorId).then(function (response) {
        var result = response.data
        itemLista = { nome: result.nome, descricao: result.descricao, valor: result.valor, quantidade: quantidade }
        vm.instalacao.materiais.push(itemLista)
      });
      
    }

    vm.showTabUpdate = function (instalacao) {
      vm.instalacao = instalacao
      tabsInstalacao.show(vm, { tabUpdate: true })
    }

    vm.showTabBaixa = function (instalacao) {
      vm.instalacao = instalacao
      tabsInstalacao.show(vm, { tabBaixa: true })
    }

    vm.showTabDelete = function (instalacao) {
      vm.instalacao = instalacao
      tabsInstalacao.show(vm, { tabDelete: true })
    }

    vm.materialDelete = function (material) {
      let index = vm.instalacao.materiais.indexOf(material)
      vm.instalacao.materiais.splice(index, 1)
    }

    vm.showTabDelete = function (instalacao) {
      vm.instalacao = instalacao
      tabsInstalacao.show(vm, { tabDelete: true })
    }

    vm.showVisualizar = function (instalacao) {
      vm.instalacao = instalacao
      tabsInstalacao.show(vm, { tabVisualizar: true })
    }

    vm.voltar = function () {
      tabsInstalacao.show(vm, {  tabListFechados: true, tabListAbertos: true, tabCreate: true  })
    }

    vm.refresh()
  }
})()
