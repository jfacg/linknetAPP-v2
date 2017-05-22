(function () {
  angular.module('linknetApp').factory('DecodeFactory', [ 
    '$window',
    'jwtHelper',
    DecodeFactory
    ])

  function DecodeFactory($window, jwtHelper) {
    function decode() {
      var store = $window.localStorage;
      var key = 'auth-token';

      var token = store.getItem(key);

      if (token) {
        var decoded = jwtHelper.decodeToken(token)
      }
      return decoded
    }
    return { decode }
  }

})()
