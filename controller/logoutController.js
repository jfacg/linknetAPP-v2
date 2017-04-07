var app = angular.module('linknetControllers');

// app.controller('LogoutController',function(UserService,toaster,$state){
app.controller('LogoutController',function(UserService,$state){
  const vm = this;
  vm.logout=function(){
    UserService.logout();
    $state.go('login');
    // toaster.pop('success',"Yup! you are logged out");
  }

});
