(function () {
  angular.module('linknetApp').factory('tabsTitulo', [TabsFactory])

  function TabsFactory() {
    function show(owner, {
      tabList =  false,
      tabCreate = false,
      tabUpdate = false,
      tabDelete = false,
      tabInstalacao = false,
      tabReparo = false,
      tabFinaceiro = false,
      }){
      owner.tabList = tabList
      owner.tabCreate = tabCreate
      owner.tabUpdate = tabUpdate
      owner.tabDelete = tabDelete
      owner.tabInstalacao = tabInstalacao
      owner.tabReparo = tabReparo
      owner.tabFinaceiro = tabDelete
    }
    return {show}
  }

})()
