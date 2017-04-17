(function () {
  angular.module('linknetApp').factory('UsuarioFactory',[
    '$resource',
    UsuarioFactory
  ]);

  function UsuarioFactory($resource) {
    var res = $resource('http://localhost:3000/api/usuario/:userId', {userId:'@id'}, {
        'update': {
          method: 'PUT'
        }
    });
    return res;
  }


})()
