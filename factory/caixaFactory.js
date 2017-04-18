(function () {
  angular.module('linknetApp').factory('CaixaFactory',[
    '$resource',
    'UrlFactory',
    CaixaFactory
  ]);

  function CaixaFactory($resource, UrlFactory) {
    var url = UrlFactory;
    var urlCaixa = `${UrlFactory}/caixa/:userId`;
    var res = $resource(urlCaixa, {userId:'@id'}, {
        'update': {
          method: 'PUT'
        }
    });
    return res;
  }
})()
