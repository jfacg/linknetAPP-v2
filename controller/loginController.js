var app = angular.module('linknetControllers',[]);

app.controller('LoginController',function(UserService,Storage,$state,AuthTokenFactory, DecodeFactory){
    const vm = this
    vm.usuario = {}

    vm.login=function(usuario){
      vm.loginError=null;
      UserService.login(vm.usuario)
      .then(function(response){
              AuthTokenFactory.setToken(response.data);
              var decoded = DecodeFactory.decode()
              Storage.save('usuario',decoded.usuario);
              Storage.save('tipo',decoded.tipo);
              Storage.save('loggedIn',true);
              $state.go('home');
            },
            function(error){ vm.loginError="Oops! Invalid email or password";});
    }
});
