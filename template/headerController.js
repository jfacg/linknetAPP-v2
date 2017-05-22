(function () {
  angular.module('linknetApp').controller('HeaderController', [
    '$http',
    'UrlFactory',
    'DecodeFactory',
    HeaderController
  ])

  function HeaderController($http, UrlFactory, DecodeFactory) {
    const vm = this
    const decoded = DecodeFactory.decode()
    vm.profile = {usuario:decoded.usuario, tipo: decoded.tipo }

  }

})()
