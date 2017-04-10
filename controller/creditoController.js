(function () {
  angular.module('linknetApp').controller('CreditoController', [
    '$http',
    'tabs',
    'toastr',
    CreditoController
  ])

    function CreditoController($http, tabs, toastr) {
      const vm = this
      // const url = 'http://localhost:3000/api'
      const url = 'http://www.linknetcg.com.br:3000/api'
      const urlCredito = `${url}/credito`
      const urlCaixa = `${url}/caixa`

      vm.refresh = function () {
        tabs.show(vm, {tabList: true, tabCreate: true})
        $http.get(urlCaixa).then(function (response) {
          geradorListas()
          vm.caixas = response.data
          vm.caixaAtual = {}
          var dataAtual = new Date;
          for (var i = 0; i < vm.caixas.length; i++) {
            if(vm.caixas[i].mes === dataAtual.getMonth()+1 && vm.caixas[i].ano === dataAtual.getFullYear()){
              vm.caixaAtual = vm.caixas[i]
          }}
          vm.caixaSelecionado = vm.caixaAtual._id;
          vm.paginate()
        })
      }

      vm.paginate = function () {
        if (vm.caixaSelecionado != null) {
          vm.pages = 0
          const urlCount = `${urlCredito}Count/${vm.caixaSelecionado}`
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
                vm.refreshCreditos(vm.caixaSelecionado, vm.skip, vm.limit)
              }
            }

            vm.next = function() {
              if(vm.current >= 1 && vm.current < vm.pages){
                vm.current += 1
                vm.skip = (vm.current-1)*vm.limit
                vm.refreshCreditos(vm.caixaSelecionado, vm.skip, vm.limit)
              }
            }

            vm.prev = function() {
              if(vm.current > 1){
                 vm.current -= 1
                 vm.skip = (vm.current-1)*vm.limit
                 vm.refreshCreditos(vm.caixaSelecionado, vm.skip, vm.limit)
            }}
            vm.refreshCreditos(vm.caixaSelecionado, vm.skip, vm.limit)
          })
        }
      }

      vm.refreshCreditos = function (id, skip, limit) {
        const urlRefresh = `${urlCredito}/${id}/${skip}/${limit}`
        $http.get(urlRefresh).then(function (response) {
          vm.creditos = response.data
          vm.credito = {valor: 0, data:new Date}
        })
      }


      const geradorListas = function () {
        vm.listaTipo = ['MENSALIDADE','INSTALACAO','VENDA','EMPRESTIMO','OUTROS']
        vm.listaStatusCred = ["RECEBIDO", "AGENDADO", "PENDENTE", "CANCELADO"]
        vm.listaStatusCaixa = ["REPASSADO", "NAO REPASSADO"]
        vm.listaColetor = ["DANIEL", "IZAQUE", "JAILSON", "JOSUE", "JUAN"]
      }


      vm.create = function () {
        const createUrl = `${urlCredito}/${vm.caixaSelecionado}`
        console.log(vm.credito);
        $http.post(createUrl, vm.credito).then(function (response) {
          toastr.success('Operação realizada com sucesso!!', 'Success')
          vm.refresh()
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        })
      }

      vm.update = function () {
        const updateUrl = `${urlCredito}/${vm.caixaSelecionado}`
        $http.put(updateUrl, vm.credito).then(function (response) {
          toastr.success('Operação realizada com sucesso!!', 'Success')
          vm.refresh()
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        })
      }

      vm.delete = function () {
        console.log('oiiii');
        const deleteUrl = `${urlCredito}/${vm.caixaSelecionado}/${vm.credito._id}`
        $http.delete(deleteUrl, vm.credito._id).then(function (response) {
          toastr.success('Operação realizada com sucesso!!', 'Success')
          vm.refresh()
        }).catch(function (response) {
          toastr.error(response.data.errors, 'Error');
        })
      }

      vm.change = function() {
        vm.paginate()
      }

      vm.showTabUpdate = function (credito) {
        vm.credito = credito
        tabs.show(vm, {tabUpdate:true})
      }

      vm.showTabDelete = function (credito) {
        vm.credito = credito
        tabs.show(vm, {tabDelete:true})
      }




      vm.refresh()
    }

})()
