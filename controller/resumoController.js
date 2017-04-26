(function () {
  angular.module('linknetApp').controller('ResumoController', [
    '$http',
    'toastr',
    'UrlFactory',
    ResumoController
  ]);

  function ResumoController($http, toastr, UrlFactory) {
    const vm = this;

    vm.refresh = function () {
      const urlCaixa = `${UrlFactory}/caixa`
      $http.get(urlCaixa).then(function(response) {
        vm.caixas = response.data
        vm.caixaAtual = {}
        var dataAtual = new Date;
        for (var i = 0; i < vm.caixas.length; i++) {
            if (vm.caixas[i].mes === dataAtual.getMonth() + 1 && vm.caixas[i].ano === dataAtual.getFullYear()) {
                vm.caixaAtual = vm.caixas[i]
            }
        }
        vm.caixaSelecionado = vm.caixaAtual._id;
        vm.refreshResumo();

      });
    };

    vm.refreshResumo = function () {
      const urlCredito = `${UrlFactory}/credito/${vm.caixaSelecionado}`
      $http.get(urlCredito).then(function (response) {
          vm.creditos = response.data;

          var coletores = getColetores(vm.creditos);
          vm.resumo = [];

          for (var i = 0; i < coletores.length; i++) {
            var item = {coletor:coletores[i], totalCreditos: 0, totalRepassado: 0, totalRetido: 0};
            vm.resumo.push(item);
          }

          for (var i = 0; i < vm.resumo.length; i++) {
            for (var j = 0; j < vm.creditos.length; j++) {
              if (vm.resumo[i].coletor == vm.creditos[j].coletor && vm.creditos[j].status == "RECEBIDO") {
                vm.resumo[i].totalCreditos += vm.creditos[j].valor;
                if (vm.creditos[j].statusCaixa === "REPASSADO") {
                  vm.resumo[i].totalRepassado += vm.creditos[j].valor;
                }
                if (vm.creditos[j].statusCaixa == "NAO REPASSADO") {
                  vm.resumo[i].totalRetido += vm.creditos[j].valor;
                }
              }
            }
          }
        });
    }

      var getColetores =  function (creditos) {
        var coletores = [];
        for (var i = 0; i < creditos.length; i++) {
          if (!contains(coletores, creditos[i].coletor )) {
            coletores.push(creditos[i].coletor);
          }
        }
        return coletores;
      }

      var contains = function (a, obj) {
          for (var i = 0; i < a.length; i++) {
              if (a[i] === obj) {return true;}
          }
          return false;
      }

      vm.refresh();
    }
})();
