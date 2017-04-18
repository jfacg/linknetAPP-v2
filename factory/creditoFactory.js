(function () {
  angular.module('linknetApp').factory('CreditoFactory',[
    '$resource',
    'UrlFactory',
    CreditoFactory
  ]);

  function CreditoFactory($resource, UrlFactory) {
    var url = UrlFactory;
    var urlCredito = `${UrlFactory}/credito/:creditoId`;
    var res = $resource(urlCredito, {creditoId:'@id'}, {
        'update': {
          method: 'PUT'
        }
    });
    return res;
  }
})()
