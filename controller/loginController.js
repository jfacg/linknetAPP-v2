var app = angular.module('linknetControllers',[]);

app.controller('LoginController',function(UserService,Storage,$state,AuthTokenFactory){
    const vm = this
    vm.usuario = {}

    vm.login=function(usuario){
      vm.loginError=null;
      UserService.login(vm.usuario)
      .then(function(response){
              AuthTokenFactory.setToken(response.data.token);
              Storage.save('username',response.data.username);
              Storage.save('loggedIn',true);
              $state.go('home');
            },
            function(error){ vm.loginError="Oops! Invalid email or password";});
    }
});
