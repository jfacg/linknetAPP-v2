(function () {
  angular.module('linknetApp').controller('UsuarioController', [
    '$http',
    'tabs',
    'toastr',
    'UrlFactory',
    'UserService',
    UsuarioController
  ])

    function UsuarioController($http, tabs, toastr, UrlFactory, UserService) {
      const vm = this
      const url = UrlFactory;
      const urlUsuario = `${url}/usuario`

      const geradorListas = function () {
        vm.listaTipo = ['ADMIN','TECNICO','FINANCEIRO']
      }

      vm.refresh = function () {
        tabs.show(vm, {tabList: true, tabCreate: true});
        const dataAtual = new Date;
        vm.usuario = {};
        geradorListas();
        $http.get(urlUsuario).then(function (response) {
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].dataNascimento = new Date(response.data[i].dataNascimento);
          }
          vm.usuarios = response.data;
        });
      };

      vm.create = function () {
        $http.post(urlUsuario,vm.usuario).then(function (response) {
          toastr.success('Operação realizada com sucesso!!', 'Success')
          vm.refresh();
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        });
      };

      vm.delete = function () {
        const deleteUrl = `${urlUsuario}/${vm.usuario._id}`
        $http.delete(deleteUrl).then(function (response) {
          toastr.success('Operação realizada com sucesso!!', 'Success')
          vm.refresh();
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        });
        vm.refresh();
      }

      vm.update = function () {
        const updateUrl = `${urlUsuario}/${vm.usuario._id}`
        $http.put(updateUrl, vm.usuario).then(function (response) {
          toastr.success('Operação realizada com sucesso!!', 'Success')
          vm.refresh();
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        });
      };

      vm.paginate = function () {
        if (vm.caixaSelecionado != null) {
          vm.pages = 0
          const urlCount = `${urlUsuario}Count/${vm.caixaSelecionado}`
          $http.get(urlCount).then(function (response) {
            vm.skip = 0
            vm.limit = 5
            vm.pages = Math.ceil(response.data.value / vm.limit)
            vm.pagesArray = Array(vm.pages).fill(0).map((e,i) => i+1)
            vm.current = 1
            vm.needPagination = vm.pages > 1
            vm.Prev = vm.current > 1
            vm.Next = vm.current < vm.pages

            vm.selectPage = function (page) {
              vm.current  = page
              if (vm.current >= 1) {
                vm.skip = (vm.current-1)*vm.limit
                vm.refresh(vm.caixaSelecionado, vm.skip, vm.limit)
              }
            }

            vm.next = function() {
              if(vm.current >= 1 && vm.current < vm.pages){
                vm.current += 1
                vm.skip = (vm.current-1)*vm.limit
                vm.refresh(vm.caixaSelecionado, vm.skip, vm.limit)
              }
            }

            vm.prev = function() {
              if(vm.current > 1){
                 vm.current -= 1
                 vm.skip = (vm.current-1)*vm.limit
                 vm.refresh(vm.caixaSelecionado, vm.skip, vm.limit)
            }}
            vm.refresh(vm.caixaSelecionado, vm.skip, vm.limit)
          })
        }
      }

      vm.change = function() {
        vm.paginate()
      }

      vm.showTabUpdate = function (usuario) {
        vm.usuario = usuario
        tabs.show(vm, {tabUpdate:true})
      }

      vm.showTabDelete = function (usuario) {
        vm.usuario = usuario
        tabs.show(vm, {tabDelete:true})
      }

      vm.refresh()
    }
})()
