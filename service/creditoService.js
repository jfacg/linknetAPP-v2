(function () {
  angular.module('linknetApp').service('CreditoService',[
    '$http',
    'toastr',
    CreditoService
  ]);

  function CreditoService($http, toastr) {
    const url = 'http://localhost:3000/api/caixa';

    return {
      save,
      list
    }

    function save(caixa) {
      $http.post(url,caixa).then(function (response) {
        toastr.success('Operação realizada com sucesso!!', 'Success')
      }).catch(function (response) {
        toastr.error(response.data.errors, 'Error');
      })
    }

    function list() {
      var data = {};
      $http.get(url).then(function (response) {
        data = response.data
        console.log(data);
      })


    }
  }

})()
