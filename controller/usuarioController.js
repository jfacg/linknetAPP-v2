(function () {
  angular.module('linknetApp').controller('UsuarioController', [
    '$http',
    'tabs',
    'toastr',
    'UsuarioService',
    '$filter',
    UsuarioController
  ])

    function UsuarioController($http, tabs, toastr, UsuarioService, $filter) {
      const vm = this
      const url = 'http://localhost:3000/api'
      // const url = 'http://www.linknetcg.com.br:3000/api'
      const urlUsuario = `${url}/usuario`

      const geradorListas = function () {
        vm.listaTipo = ['ADMIN','TECNICO','FINANCEIRO']
      }

      vm.refresh = function () {
        tabs.show(vm, {tabList: true, tabCreate: true});
        const dataAtual = new Date;
        vm.usuario = {};
        vm.usuario.dataNascimento = dataAtual;
        geradorListas();

        const getUsuarios = UsuarioService.getUsuarios();
        getUsuarios.$promise.then(function (data) {

          for (var i = 0; i < data.length; i++) {
            data[i].dataNascimento = new Date(data[i].dataNascimento)
          }
          vm.usuarios = data;
          vm.paginate()
        });
      };

      vm.create = function () {
        // let data = $filter('date')(vm.usuario.dataNascimento, "dd/MM/yyyy" )
        // vm.usuario.dataNascimento = data;
        UsuarioService.saveUsuario(vm.usuario);
        vm.refresh();
      };

      vm.delete = function () {
        UsuarioService.deleteUsuario(vm.usuario._id);
        vm.refresh();
      }

      vm.update = function () {
        UsuarioService.updateUsuario(vm.usuario._id, vm.usuario);
        vm.refresh();
      }

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
