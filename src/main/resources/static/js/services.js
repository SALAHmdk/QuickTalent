app.factory('AuthService', ['$http', function($http) {
    var authService = {};

    // Inscription candidat
    authService.registerCandidat = function(candidat) {
        return $http.post('/api/auth/register/candidat', candidat);
    };

    // Inscription recruteur
    authService.registerRecruteur = function(recruteur) {
        return $http.post('/api/auth/register/recruteur', recruteur);
    };

    // Login
    authService.login = function(credentials) {
        return $http({
            method: 'POST',
            url: '/api/auth/login',
            data: 'username=' + encodeURIComponent(credentials.username) + '&password=' + encodeURIComponent(credentials.password),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    };

    // Logout
    authService.logout = function() {
        return $http.post('/api/auth/logout');
    };

    // Récupérer profil (GET /api/candidats/me ou /api/recruteurs/me)
    authService.getProfile = function(role) {
        if (role === 'CANDIDAT') {
            return $http.get('/api/candidats/me');
        } else if (role === 'RECRUTEUR') {
            return $http.get('/api/recruteurs/me');
        }
    };

    return authService;
}]);

app.factory('OffreService', ['$http', function($http) {
    var offreService = {};

    // Lister toutes les offres
    offreService.getAll = function() {
        return $http.get('/api/offres');
    };

    // Filtrer par ville
    offreService.getByVille = function(ville) {
        return $http.get('/api/offres?ville=' + encodeURIComponent(ville));
    };

    // Filtrer par titre
    offreService.getByTitre = function(titre) {
        return $http.get('/api/offres?titre=' + encodeURIComponent(titre));
    };

    return offreService;
}]);

app.factory('CandidatService', ['$http', function($http) {
    var candidatService = {};

    // Récupérer les candidatures du candidat
    candidatService.getCandidatures = function() {
        return $http.get('/api/candidats/me/candidatures');
    };

    // Postuler à une offre
    candidatService.postuler = function(offreId) {
        return $http.post('/api/candidats/me/candidatures', { offre: { id: offreId } });
    };

    // Supprimer une candidature
    candidatService.supprimerCandidature = function(id) {
        return $http.delete('/api/candidats/me/candidatures/' + id);
    };

    return candidatService;
}]);

app.factory('RecruteurService', ['$http', function($http) {
    var recruteurService = {};

    // Récupérer les offres du recruteur
    recruteurService.getOffres = function() {
        return $http.get('/api/recruteurs/me/offres');
    };

    // Créer une nouvelle offre
    recruteurService.ajouterOffre = function(offre) {
        return $http.post('/api/recruteurs/me/offres', offre);
    };

    // Supprimer une offre
    recruteurService.supprimerOffre = function(id) {
        return $http.delete('/api/recruteurs/me/offres/' + id);
    };

    // Lister les candidatures pour une offre
    recruteurService.getCandidaturesParOffre = function(offreId) {
        return $http.get('/api/recruteurs/me/offres/' + offreId + '/candidatures');
    };

    return recruteurService;
}]);
