(function () {
  angular.module('linknetApp').factory('UsuarioFactory',[
    '$resource',
    UsuarioFactory
  ]);

  function UsuarioFactory($resource) {
    var service = {};
    var res = $resource('http://localhost:3000/api/usuario/:id', {id:'@id'});
    service.resource = $resource('http://localhost:3000/api/usuario/:id', {id:'@id'});

    service.getUsuarios = function() {
      return res.query(function (data) {
        return data;
      })
    }
    service.getUsuario = function(nome) {
      var a = nome;
      return nome;
    }

    return service;



  }


})()
