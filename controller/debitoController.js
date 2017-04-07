(function () {
  angular.module('linknetApp').controller('DebitoController', [
    '$http',
    'tabs',
    'toastr',
    DebitoController
  ])

    function DebitoController($http, tabs, toastr) {
      const vm = this
      const url = 'http://localhost:3000/api'
      // const url = 'http://www.linknetcg.com.br:3000/api'
      const urlDebito = `${url}/debito`
      const urlCaixa = `${url}/caixa`

      vm.refresh = function () {
        tabs.show(vm, {tabList: true, tabCreate: true})
        $http.get(urlCaixa).then(function (response) {
          geradorListas()
          vm.caixas = response.data
          vm.caixaAtual = {}
          const dataAtual = new Date
          for (var i = 0; i < vm.caixas.length; i++) {
            if(vm.caixas[i].mes === dataAtual.getMonth()+1 && vm.caixas[i].ano === dataAtual.getFullYear()){
              vm.caixaAtual = vm.caixas[i]
          }}
          vm.caixaSelecionado = vm.caixaAtual._id
          vm.paginate()
        })
      }

      vm.paginate = function () {
        if (vm.caixaSelecionado != null) {
          vm.pages = 0
          const urlCount = `${urlDebito}Count/${vm.caixaSelecionado}`
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
                vm.refreshDebitos(vm.caixaSelecionado, vm.skip, vm.limit)
              }
            }

            vm.next = function() {
              if(vm.current >= 1 && vm.current < vm.pages){
                vm.current += 1
                vm.skip = (vm.current-1)*vm.limit
                vm.refreshDebitos(vm.caixaSelecionado, vm.skip, vm.limit)
              }
            }

            vm.prev = function() {
              if(vm.current > 1){
                 vm.current -= 1
                 vm.skip = (vm.current-1)*vm.limit
                 vm.refreshDebitos(vm.caixaSelecionado, vm.skip, vm.limit)
            }}
            vm.refreshDebitos(vm.caixaSelecionado, vm.skip, vm.limit)
          })
        }
      }

      vm.refreshDebitos = function (id, skip, limit) {
        const urlRefresh = `${urlDebito}/${id}/${skip}/${limit}`
        $http.get(urlRefresh).then(function (response) {
          vm.debitos = response.data
          vm.debito = {valor: 0, data:new Date}
        })
      }



      const geradorListas = function () {
        vm.listaTipo = ['COMPRA','SALARIO','CONTA','OUTRO']
        vm.listaStatusDebt = ["PAGO", "AGENDADO", "PENDENTE", "CANCELADO"]
        vm.listaStatusCaixa = ["LOJA", "PROPRIO"]
        vm.listaPagador = ["DANIEL", "IZAQUE", "JAILSON", "JOSUE", "JUAN"]
      }

      vm.create = function () {
        const createUrl = `${urlDebito}/${vm.caixaSelecionado}`
        $http.post(createUrl, vm.debito).then(function (response) {
          toastr.success('Operação realizada com sucesso!!', 'Success')
          vm.refresh()
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        })
      }

      vm.update = function () {
        const updateUrl = `${urlDebito}/${vm.caixaSelecionado}`
        $http.put(updateUrl, vm.debito).then(function (response) {
          toastr.success('Operação realizada com sucesso!!', 'Success')
          vm.refresh()
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        })
      }

      vm.delete = function () {
        const deleteUrl = `${urlDebito}/${vm.caixaSelecionado}/${vm.debito._id}`
        $http.delete(deleteUrl).then(function (response) {
          toastr.success('Operação realizada com sucesso!!', 'Success')
          vm.refresh()
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        })
      }

      vm.change = function() {
        vm.paginate()
      }

      vm.showTabUpdate = function (debito) {
        vm.debito = debito
        tabs.show(vm, {tabUpdate:true})
      }

      vm.showTabDelete = function (debito) {
        vm.debito = debito
        tabs.show(vm, {tabDelete:true})
      }

      vm.refresh()
    }

})()
