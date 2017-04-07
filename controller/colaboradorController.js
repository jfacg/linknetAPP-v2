(function () {
  angular.module('linknetApp').controller('ColaboradorController', [
    '$http',
    'tabs',
    'toastr',
    ColaboradorController
  ])

    function ColaboradorController($http, tabs, toastr) {
      const vm = this
      const url = 'http://localhost:3000/api'
      // const url = 'http://www.linknetcg.com.br:3000/api'
      const urlColaborador = `${url}/usuario`

      const geradorListas = function () {
        vm.listaTipo = ['ADMIN','TECNICO','FINANCEIRO']
      }

      vm.refresh = function () {
        tabs.show(vm, {tabList: true, tabCreate: true})
        $http.get(urlColaborador).then(function (response) {
          geradorListas()
          vm.colaboradores = response.data
          vm.colaborador = {}
          const dataAtual = new Date
          // vm.paginate()
        })
      }

      vm.create = function () {
        const createUrl = `${urlColaborador}`
        $http.post(createUrl, vm.colaborador).then(function (response) {
          vm.refresh()
          toastr.success('Operação realizada com sucesso!!', 'Success')
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        })
      }

      vm.delete = function () {
        console.log(vm.colaborador);
        const deleteUrl = `${urlColaborador}/${vm.colaborador._id}`
        $http.delete(deleteUrl).then(function (response) {
          vm.refresh()
          toastr.success('Operação realizada com sucesso!!', 'Success')
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        })
      }

      vm.update = function () {
        const updateUrl = `${urlColaborador}/${vm.colaborador._id}`
        $http.put(updateUrl, vm.colaborador).then(function (response) {
          vm.refresh()
          toastr.success('Operação realizada com sucesso!!', 'Success')
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        })
      }

      vm.paginate = function () {
        if (vm.caixaSelecionado != null) {
          vm.pages = 0
          const urlCount = `${urlColaborador}Count/${vm.caixaSelecionado}`
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

      vm.showTabUpdate = function (colaborador) {
        vm.colaborador = colaborador
        tabs.show(vm, {tabUpdate:true})
      }

      vm.showTabDelete = function (colaborador) {
        vm.colaborador = colaborador
        tabs.show(vm, {tabDelete:true})
      }

      vm.refresh()
    }
})()
