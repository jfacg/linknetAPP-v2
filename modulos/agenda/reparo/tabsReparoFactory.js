(function () {
  angular.module('linknetApp').factory('tabsReparo', [TabsFactory])

  function TabsFactory() {
    function show(owner, {
      tabListAbertos =  false,
      tabListFechados = false,
      tabBaixa = false,
      tabCreate = false,
      tabUpdate = false,
      tabDelete = false,
      tabVisualizar = false

      }){
      owner.tabListAbertos = tabListAbertos
      owner.tabListFechados = tabListFechados
      owner.tabBaixa = tabBaixa
      owner.tabCreate = tabCreate
      owner.tabUpdate = tabUpdate
      owner.tabDelete = tabDelete
      owner.tabVisualizar = tabVisualizar
    }
    return {show}
  }

})()
