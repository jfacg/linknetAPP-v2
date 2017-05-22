(function () {
  angular.module('linknetApp').controller('MaterialController', [
    '$http',
    'tabs',
    'toastr',
    'UrlFactory',
    'UserService',
    MaterialController
  ])

  function MaterialController($http, tabs, toastr, UrlFactory, UserService) {
    const vm = this
    const url = UrlFactory;
    const urlMaterial = `${url}/material`

    vm.refresh = function () {
      tabs.show(vm, { tabList: true, tabCreate: true });
      vm.material = {};
      vm.materiais = []
      $http.get(urlMaterial).then(function (response) {
        vm.materiais = response.data
      });
    };

    vm.create = function () {
      $http.post(urlMaterial, vm.material).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh();
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error');
      });
    };

    vm.delete = function () {
      const deleteUrl = `${urlMaterial}/${vm.material._id}`
      $http.delete(deleteUrl).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh();
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error');
      });
    }

    vm.update = function () {
      const updateUrl = `${urlMaterial}/${vm.material._id}`
      $http.put(updateUrl, vm.material).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
        vm.refresh();
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error');
      });
    };

    vm.showTabUpdate = function (material) {
      vm.material = material
      tabs.show(vm, { tabUpdate: true })
    }

    vm.showTabDelete = function (material) {
      vm.material = material
      tabs.show(vm, { tabDelete: true })
    }

    vm.refresh()
  }
})()
