(function () {
  angular.module('linknetApp').factory('TesteFactory',[
    '$resource',
    'UrlFactory',
    TesteFactory
  ]);

  function TesteFactory($resource, UrlFactory) {
    var url = UrlFactory;
    var urlTeste = `${UrlFactory}/caixa/:userId`;
    var res = $resource(urlTeste, {userId:'@id'}, {
        'update': {
          method: 'PUT'
        }
    });
    return res;
  }
})()
