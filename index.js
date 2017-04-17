var app = angular.module('linknetApp', [
  'ui.router',
  'toastr',
  'ngResource',
  'linknetServices',
  'linknetControllers',
  'linknetFactory'
])

app.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});

app.run(function($rootScope,AuthService,$state){
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
         if(toState.authenticate && toState.name !== 'login' && !AuthService.isLoggedIn()){
           event.preventDefault();
           $state.transitionTo('login');
         }
      });
});

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login')

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: "view/login/login.html",
    controller: 'LoginController',
    controllerAs: 'loginCtrl'
  })
  .state('home', {
    url: '/home',
    templateUrl: "view/home/home.html",
    authenticate: true
  })
  .state('home.dashboard', {
    url: '/dashboard',
    templateUrl: "view/dashboard/dashboard.html",
    authenticate: true
  })
  .state('home.caixa', {
    url: '/caixa',
    templateUrl: "view/caixa/caixa.html",
    controller: 'CaixaController',
    controllerAs: 'caixaCtrl',
    authenticate: true
  })
  .state('home.credito', {
    url: '/credito',
    templateUrl: "view/credito/credito.html",
    controller: 'CreditoController',
    controllerAs: 'credCtrl',
    authenticate: true
  })
  .state('home.debito', {
    url: '/debito',
    templateUrl: "view/debito/debito.html",
    controller: 'DebitoController',
    controllerAs: 'debCtrl',
    authenticate: true
  })
  .state('home.usuario', {
    url: '/usuario',
    templateUrl: "view/usuario/usuario.html",
    controller: 'UsuarioController',
    controllerAs: 'userCtrl',
    authenticate: true
  })
  .state('home.resumo', {
    url: '/resumo',
    templateUrl: "view/resumo/resumo.html",
    controller: 'ResumoController',
    controllerAs: 'resCtrl',
    authenticate: true
  })
})
