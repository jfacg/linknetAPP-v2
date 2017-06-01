(function () {
  angular.module('linknetApp').factory('tabsCredito', [TabsFactory])

  function TabsFactory() {
    function show(owner, {
      tabList =  false,
      tabCreate = false,
      tabUpdate = false,
      tabDelete = false,
      tabVisualizar = false,
      }){
      owner.tabList = tabList
      owner.tabCreate = tabCreate
      owner.tabUpdate = tabUpdate
      owner.tabDelete = tabDelete
      owner.tabVisualizar = tabVisualizar
    }
    return {show}
  }

})()
