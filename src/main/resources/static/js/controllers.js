// Contrôleur pour la page d’accueil (liste des offres)
app.controller('HomeController', ['$scope', 'OffreService', function($scope, OffreService) {
    $scope.offres = [];
    $scope.searchVille = '';
    $scope.searchTitre = '';

    // Charger toutes les offres au démarrage
    OffreService.getAll().then(function(response) {
        $scope.offres = response.data;
    }, function(error) {
        console.error('Erreur lors de la récupération des offres', error);
    });

    // Filtrer par ville
    $scope.filterVille = function() {
        if ($scope.searchVille) {
            OffreService.getByVille($scope.searchVille).then(function(response) {
                $scope.offres = response.data;
            });
        } else {
            // Si champ vide, recharger toutes
            OffreService.getAll().then(function(response) {
                $scope.offres = response.data;
            });
        }
    };

    // Filtrer par titre
    $scope.filterTitre = function() {
        if ($scope.searchTitre) {
            OffreService.getByTitre($scope.searchTitre).then(function(response) {
                $scope.offres = response.data;
            });
        } else {
            OffreService.getAll().then(function(response) {
                $scope.offres = response.data;
            });
        }
    };
}]);

// Contrôleur pour l’authentification (login + inscription)
app.controller('AuthController', ['$scope', 'AuthService', '$location', function($scope, AuthService, $location) {
    $scope.credentials = { username: '', password: '' };
    $scope.user = {}; // Pour inscription

    // Login
    $scope.login = function() {
        AuthService.login($scope.credentials).then(function(response) {
            // Après connexion, définir le rôle et rediriger selon rôle
            AuthService.getProfile('CANDIDAT').then(function(respC) {
                // Si réponse OK, c’est un candidat
                $location.path('/dashboard/candidat');
            }, function(errC) {
                // Sinon tester recruteur
                AuthService.getProfile('RECRUTEUR').then(function(respR) {
                    $location.path('/dashboard/recruteur');
                }, function(errR) {
                    // Problème : utilisateur non trouvé
                    alert('Impossible de déterminer le rôle');
                });
            });
        }, function(error) {
            alert('Échec de la connexion');
        });
    };

    // Inscription Candidat
    $scope.registerCandidat = function() {
        AuthService.registerCandidat($scope.user).then(function(response) {
            alert('Inscription candidat réussie !');
            $location.path('/login');
        }, function(error) {
            alert('Erreur inscription candidat');
        });
    };

    // Inscription Recruteur
    $scope.registerRecruteur = function() {
        AuthService.registerRecruteur($scope.user).then(function(response) {
            alert('Inscription recruteur réussie !');
            $location.path('/login');
        }, function(error) {
            alert('Erreur inscription recruteur');
        });
    };
}]);

// Contrôleur pour l’espace candidat
app.controller('CandidatController', ['$scope', 'CandidatService', function($scope, CandidatService) {
    $scope.candidatures = [];
    $scope.offreId = null; // pour postuler

    // Charger les candidatures
    CandidatService.getCandidatures().then(function(response) {
        $scope.candidatures = response.data;
    }, function(error) {
        console.error('Erreur lors de la récupération des candidatures', error);
    });

    // Postuler à une offre
    $scope.postuler = function() {
        if ($scope.offreId) {
            CandidatService.postuler($scope.offreId).then(function(response) {
                alert('Candidature enregistrée !');
                // Recharger la liste des candidatures
                CandidatService.getCandidatures().then(function(resp) {
                    $scope.candidatures = resp.data;
                });
            }, function(error) {
                alert('Erreur lors de la candidature');
            });
        }
    };

    // Supprimer une candidature
    $scope.supprimer = function(id) {
        if (confirm('Voulez-vous vraiment supprimer cette candidature ?')) {
            CandidatService.supprimerCandidature(id).then(function(response) {
                alert('Candidature supprimée');
                $scope.candidatures = $scope.candidatures.filter(c => c.id !== id);
            }, function(error) {
                alert('Impossible de supprimer');
            });
        }
    };
}]);

// Contrôleur pour l’espace recruteur
app.controller('RecruteurController', ['$scope', 'RecruteurService', function($scope, RecruteurService) {
    $scope.offres = [];
    $scope.newOffre = { titre: '', ville: '', description: '' };
    $scope.selectedOffreId = null;
    $scope.candidatures = [];

    // Charger les offres du recruteur
    RecruteurService.getOffres().then(function(response) {
        $scope.offres = response.data;
    }, function(error) {
        console.error('Erreur lors de la récupération des offres', error);
    });

    // Ajouter une offre
    $scope.ajouterOffre = function() {
        if ($scope.newOffre.titre && $scope.newOffre.ville) {
            RecruteurService.ajouterOffre($scope.newOffre).then(function(response) {
                alert('Offre ajoutée !');
                $scope.offres.push(response.data);
                $scope.newOffre = { titre: '', ville: '', description: '' };
            }, function(error) {
                alert('Erreur lors de la création de l’offre');
            });
        }
    };

    // Supprimer une offre
    $scope.supprimerOffre = function(id) {
        if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
            RecruteurService.supprimerOffre(id).then(function(response) {
                alert('Offre supprimée');
                $scope.offres = $scope.offres.filter(o => o.id !== id);
            }, function(error) {
                alert('Impossible de supprimer l’offre');
            });
        }
    };

    // Lister les candidatures pour une offre sélectionnée
    $scope.chargerCandidatures = function(id) {
        $scope.selectedOffreId = id;
        RecruteurService.getCandidaturesParOffre(id).then(function(response) {
            $scope.candidatures = response.data;
        }, function(error) {
            console.error('Erreur récupération candidatures', error);
        });
    };
}]);
