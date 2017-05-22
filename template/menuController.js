(function () {
  angular.module('linknetApp').controller('MenuController', [
    '$http',
    'UrlFactory',
    'DecodeFactory',
    MenuController
  ])

  function MenuController($http, UrlFactory, DecodeFactory) {
    const vm = this
    const decoded = DecodeFactory.decode()
    vm.profile = {usuario:decoded.usuario, login: decoded.login }

  }

})()
