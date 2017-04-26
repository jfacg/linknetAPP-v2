(function () {
  angular.module('linknetApp').controller('AgendaController',[
    '$http',
    'tabs',
    'toastr',
    'UrlFactory',
    AgendaController
  ]);

  function AgendaController ($http, tabs, toastr, UrlFactory) {
    const vm = this;
    const url = UrlFactory;
    const urlAgenda = `${url}/agenda`;
    const urlUsuario = `${url}/usuario`;

    vm.checkboxModel = {value1: 'ABERTO', value2: 'FECHADO'};

    vm.refresh = function () {
      tabs.show(vm, {tabList: true, tabCreate: true})
      geradorListas();
      vm.agenda = {};
      vm.tecnicos = [];
      $http.get(urlAgenda).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].dataAgenda = new Date(response.data[i].dataAgenda);
        }
        vm.agendas = response.data
      })
      $http.get(urlUsuario).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          vm.tecnicos[i] = response.data[i].nome;
        }
      });
    }

    vm.create = function () {
      vm.agenda.status = "ABERTO";
      console.log(vm.agenda);
      $http.post(urlAgenda, vm.agenda).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh();
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error');
      });
    };

    vm.update = function () {
      if (vm.agenda.baixa != null) {
        vm.agenda.status = "FECHADO"
      }
      const updateUrl = `${urlAgenda}/${vm.agenda._id}`
      $http.put(updateUrl, vm.agenda).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error');
      });
    };

    vm.delete = function () {
      const deleteUrl = `${urlAgenda}/${vm.agenda._id}`
      $http.delete(deleteUrl).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh()
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error');
      })
    }

    vm.showTabUpdate = function (agenda) {
      vm.agenda = agenda
      tabs.show(vm, {tabUpdate:true})
    }

    vm.showTabDelete = function (agenda) {
      vm.agenda = agenda
      tabs.show(vm, {tabDelete:true})
    }

    const geradorListas = function() {
        vm.listaTipoServico = ['INSTALACAO', 'MANUTENCAO', 'VIABILIDADE', 'FINANCEIRO'];
        vm.listaAtividades = ['ENVIAR BOLETO', 'ENTREGAR BOLETO', 'VISITAR', 'RECEBER']
    }

    vm.refresh()
  };
})()
