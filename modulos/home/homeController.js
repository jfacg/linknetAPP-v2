(function () {
  angular.module('linknetApp').controller('HomeController', [
    '$http',
    'UrlFactory',
    HomeController
  ])

  function HomeController($http, UrlFactory) {
    const vm = this
    const url = UrlFactory;
    const urlClientes = `${url}/mk/carregarClientes`
    const urlTitulos = `${url}/mk/carregarTitulos`
    const urlTitulosVencidos = `${url}/mk/carregarTitulosVencidos`
    vm.refresh = function functionName() {
      // $http.get(urlClientes).then(function (response) {})
      // $http.get(urlTitulosVencidos).then(function (response) {})
    }

    vm.refresh()
  }
})()
