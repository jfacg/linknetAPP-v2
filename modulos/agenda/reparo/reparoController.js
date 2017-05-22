(function () {
  angular.module('linknetApp').controller('ReparoController', [
    '$http',
    'tabsReparo',
    'toastr',
    'UrlFactory',
    'DecodeFactory',
    ReparoController
  ])

  function ReparoController($http, tabsReparo, toastr, UrlFactory, DecodeFactory) {
    const vm = this
    const url = UrlFactory
    const urlReparo = `${url}/reparo`
    const urlUsuario = `${url}/usuario`
    const urlMaterial = `${url}/material`
    const decoded = DecodeFactory.decode()
    vm.materiais = []
    vm.item = {}
    vm.quantidade = 0;

    vm.refresh = function () {
      tabsReparo.show(vm, { tabListFechados: true, tabListAbertos: true, tabCreate: true })
      vm.reparo = {}
      vm.reparosAbertas = []
      vm.reparosFechadas = []
      vm.usuarios = []
      $http.get(urlReparo).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].dataAgenda = new Date(response.data[i].dataAgenda)
          if (response.data[i].baixado === 'N' && response.data[i].excluido === 'N') {
            vm.reparosAbertas.push(response.data[i])
          }
          if (response.data[i].baixado === 'S' && response.data[i].excluido === 'N') {
            vm.reparosFechadas.push(response.data[i])
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
      vm.reparo.usuario = decoded.usuario
      vm.reparo.dataRegistro = new Date()
      $http.post(urlReparo, vm.reparo).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error')
      })
    }

    vm.delete = function () {
      const deleteUrl = `${urlReparo}/${vm.agenda._id}`
      $http.delete(deleteUrl).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error')
      })
    }

    vm.update = function () {
      if (vm.reparo.baixado === 'S') {
        vm.reparo.dataBaixa = new Date()
      }
      const updateUrl = `${urlReparo}/${vm.reparo._id}`
      $http.put(updateUrl, vm.reparo).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error')
        console.log(response.data.errors);

      })
    }

    vm.materialAdd = function (idMaterial, quantidade) {
      tabsReparo.show(vm, { tabBaixa: true })
      let urlMaterialPorId = `${url}/material/${idMaterial}`
      $http.get(urlMaterialPorId).then(function (response) {
        var result = response.data
        itemLista = { nome: result.nome, descricao: result.descricao, valor: result.valor, quantidade: quantidade }
        vm.reparo.materiais.push(itemLista)
      });

    }

    vm.showTabUpdate = function (reparo) {
      vm.reparo = reparo
      tabsReparo.show(vm, { tabUpdate: true })
    }

    vm.showTabBaixa = function (reparo) {
      vm.reparo = reparo
      tabsReparo.show(vm, { tabBaixa: true })
    }

    vm.showTabDelete = function (reparo) {
      vm.reparo = reparo
      tabsReparo.show(vm, { tabDelete: true })
    }

    vm.materialDelete = function (material) {
      let index = vm.reparo.materiais.indexOf(material)
      vm.reparo.materiais.splice(index, 1)
    }

    vm.showTabDelete = function (reparo) {
      vm.reparo = reparo
      tabsReparo.show(vm, { tabDelete: true })
    }

    vm.showVisualizar = function (reparo) {
      vm.reparo = reparo
      tabsReparo.show(vm, { tabVisualizar: true })
    }

    vm.voltar = function () {
      tabsReparo.show(vm, {  tabListFechados: true, tabListAbertos: true, tabCreate: true  })
    }

    vm.refresh()
  }
})()
