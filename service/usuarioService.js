(function () {
  angular.module('linknetApp').service('UsuarioService', [
    'UsuarioFactory',
    UsuarioService
  ]);

  function UsuarioService(UsuarioFactory) {

    function getUsuarios (UsuarioFactory) {
      UsuarioFactory.query(function (data) {
        console.log(data);
      });
    };

    return {getUsuarios};
  }
})()
