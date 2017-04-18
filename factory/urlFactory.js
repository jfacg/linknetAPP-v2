(function () {
  angular.module('linknetApp').factory('UrlFactory',[
    UrlFactory
  ]);

  function UrlFactory() {
    // var url = 'http://www.linknetcg.com.br:3000/api'
    var url = 'http://localhost:3000/api'

    return url;
  }


})()
