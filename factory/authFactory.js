(function () {
  angular.module('linknetApp').factory('auth', [AuthFactory])

  function AuthFactory() {
    function show(owner, {
      authAdmin = false,
      authTecnico =  false,
      authFinanceiro = false
      }){
      owner.authAdmin = authAdmin
      owner.authTecnico = authTecnico
      owner.authFinanceiro = authFinanceiro
    }
    return {show}
  }

})()
