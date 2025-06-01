(function() {
  'use strict';

  angular
    .module('quickTalentApp', ['ngRoute'])
    .config(configureRoutes)
    .controller('MainController', MainController)
    .controller('AuthController', AuthController)
    .service('ApiService', ApiService);

  /** 1) Configuration des routes **/
  function configureRoutes($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'AuthController',
        controllerAs: 'vm'
      })
      .when('/register-candidat', {
        templateUrl: 'partials/register-candidat.html',
        controller: 'AuthController',
        controllerAs: 'vm'
      })
      .when('/register-recruteur', {
        templateUrl: 'partials/register-recruteur.html',
        controller: 'AuthController',
        controllerAs: 'vm'
      })
      .when('/dashboard-candidat', {
        templateUrl: 'partials/dashboard-candidat.html',
        controller: 'DashboardCandidatController',
        controllerAs: 'vm'
      })
      .when('/dashboard-recruteur', {
        templateUrl: 'partials/dashboard-recruteur.html',
        controller: 'DashboardRecruteurController',
        controllerAs: 'vm'
      })
      .otherwise('/');
  }

  /** 2) Contrôleur principal pour la navbar "active" **/
  function MainController($location) {
    var vm = this;
    vm.isActive = function(path) {
      return $location.path() === path;
    };
  }

  /** 3) Contrôleur “Auth” pour login + inscription **/
  function AuthController($http, $location) {
    var vm = this;
    vm.credentials = {
      username: '',
      password: '',
      email: ''       // Pour l’inscription
    };

    vm.login = function() {
      // Appel POST /api/login ou votre endpoint Spring Security
      // Exemple simplifié :
      $http.post('/api/login', vm.credentials)
        .then(function(resp) {
          // Si succès :
          $location.path('/dashboard-candidat'); 
          // (ou /dashboard-recruteur selon votre logique)
        })
        .catch(function(err) {
          vm.error = 'Échec de la connexion';
        });
    };

    vm.registerCandidat = function() {
      // POST vers /api/candidats/register
      $http.post('/api/candidats/register', vm.credentials)
        .then(function(resp) {
          $location.path('/login');
        })
        .catch(function(err) {
          vm.error = 'Échec de l’inscription candidat';
        });
    };

    vm.registerRecruteur = function() {
      // POST vers /api/recruteurs/register
      $http.post('/api/recruteurs/register', vm.credentials)
        .then(function(resp) {
          $location.path('/login');
        })
        .catch(function(err) {
          vm.error = 'Échec de l’inscription recruteur';
        });
    };
  }

  /** 4) Contrôleur pour le dashboard Candidat **/
  function DashboardCandidatController(ApiService) {
    var vm = this;
    vm.candidatures = [];

    vm.loadCandidatures = function() {
      // Appel GET /api/candidatures (ou votre endpoint pour récuperer tout ce qui concerne le candidat connecté)
      ApiService.getCandidatures()
        .then(function(resp) {
          vm.candidatures = resp.data;
        })
        .catch(function(err) {
          vm.error = 'Impossible de charger vos candidatures';
        });
    };

    vm.loadCandidatures();
  }

  /** 5) Contrôleur pour le dashboard Recruteur **/
  function DashboardRecruteurController(ApiService) {
    var vm = this;
    vm.offres = [];

    vm.loadOffres = function() {
      // Appel GET /api/offres/recruteur (endpoint qui retourne les offres du recruteur connecté)
      ApiService.getOffresByRecruteur()
        .then(function(resp) {
          vm.offres = resp.data;
        })
        .catch(function(err) {
          vm.error = 'Impossible de charger vos offres';
        });
    };

    vm.loadOffres();
  }

  /** 6) Service pour interagir avec l’API back-end **/
  function ApiService($http) {
    var baseUrl = '/api';

    // Exemple de méthodes :
    this.getCandidatures = function() {
      return $http.get(baseUrl + '/candidatures');
    };
    this.getOffresByRecruteur = function() {
      return $http.get(baseUrl + '/offres/recruteur');
    };
    // Ajoutez d’autres appels (login, register, etc.) si nécessaire.
  }

  // Enregistrement des nouveaux contrôleurs
  angular
    .module('quickTalentApp')
    .controller('DashboardCandidatController', DashboardCandidatController)
    .controller('DashboardRecruteurController', DashboardRecruteurController);

})();
