// Déclaration du module principal avec dépendance ngRoute
var app = angular.module('stageApp', ['ngRoute']);

// Configuration des routes
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        // Page d’accueil : liste des offres
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        })
        // Page de login
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'AuthController'
        })
        // Inscription candidat
        .when('/register/candidat', {
            templateUrl: 'partials/register-candidat.html',
            controller: 'AuthController'
        })
        // Inscription recruteur
        .when('/register/recruteur', {
            templateUrl: 'partials/register-recruteur.html',
            controller: 'AuthController'
        })
        // Tableau de bord candidat
        .when('/dashboard/candidat', {
            templateUrl: 'partials/dashboard-candidat.html',
            controller: 'CandidatController'
        })
        // Tableau de bord recruteur
        .when('/dashboard/recruteur', {
            templateUrl: 'partials/dashboard-recruteur.html',
            controller: 'RecruteurController'
        })
        // URL non reconnue → redirige vers la page d’accueil
        .otherwise({ redirectTo: '/' });

    // Optionnel : retirer le #! pour le mode HTML5
    // $locationProvider.html5Mode(true);
}]);
