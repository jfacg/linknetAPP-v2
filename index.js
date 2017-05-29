var app = angular.module('linknetApp', [
  'ui.router',
  'toastr',
  'ngResource',
  'ui.utils.masks',
  'linknetServices',
  'angular-jwt',
  'linknetControllers',
  'linknetFactory'
])

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});

app.run(function ($rootScope, AuthService, $state, AuthTokenFactory, jwtHelper) {

  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    if (toState.authenticate && toState.name !== 'login' && !AuthService.isLoggedIn()) {
      event.preventDefault();
      $state.transitionTo('login');
    }
  });
});

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login')

  $stateProvider
    //LOGIN
    .state('login', {
      url: '/login',
      templateUrl: "view/login/login.html",
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    })
    //HOME
    .state('home', {
      url: '/home',
      templateUrl: "modulos/home/home.html",
      controller: 'HomeController',
      controllerAs: 'vm',
      authenticate: true
    })
    //DASHBOARD
    .state('home.dashboard', {
      url: '/dashboard',
      templateUrl: "view/dashboard/dashboard.html",
      authenticate: true
    })
    //TITULO
    .state('home.titulo', {
      url: '/titulo',
      templateUrl: "modulos/titulo/titulo.html",
      controller: 'TituloController',
      controllerAs: 'vm',
      authenticate: true
    })
    //FINANCEIRO
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
    .state('home.resumo', {
      url: '/resumo',
      templateUrl: "view/resumo/resumo.html",
      controller: 'ResumoController',
      controllerAs: 'resCtrl',
      authenticate: true
    })
    //USUARIO
    .state('home.usuario', {
      url: '/usuario',
      templateUrl: "modulos/usuario/usuario.html",
      controller: 'UsuarioController',
      controllerAs: 'vm',
      authenticate: true
    })
    //MATERIAL
    .state('home.material', {
      url: '/material',
      templateUrl: "modulos/material/material.html",
      controller: 'MaterialController',
      controllerAs: 'vm',
      authenticate: true
    })
    //AGENDA INSTALACAO
    .state('home.instalacao', {
      url: '/instalacao',
      templateUrl: "modulos/agenda/instalacao/instalacao.html",
      controller: 'InstalacaoController',
      controllerAs: 'vm',
      authenticate: true
    })
    //AGENDA INSTALACAO
    .state('home.reparo', {
      url: '/reparo',
      templateUrl: "modulos/agenda/reparo/reparo.html",
      controller: 'ReparoController',
      controllerAs: 'vm',
      authenticate: true
    })
    //AGENDA COBRANÇA
    .state('home.cobranca', {
      url: '/cobranca',
      templateUrl: "modulos/agenda/cobranca/cobranca.html",
      controller: 'CobrancaController',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('home.agenda', {
      url: '/agenda',
      templateUrl: "modulos/agenda/agenda.html",
      controller: 'AgendaController',
      controllerAs: 'vm',
      authenticate: true
    })
})
