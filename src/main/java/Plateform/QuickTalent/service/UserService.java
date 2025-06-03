// src/main/java/Plateform/QuickTalent/service/UserService.java
package Plateform.QuickTalent.service;

import java.util.Optional;

import Plateform.QuickTalent.entite.Utilisateur;

public interface UserService {
    boolean existsByEmail(String email);

    /**
     * Crée un utilisateur (Candidat ou Recruteur) en fonction du paramètre “type”.
     * 
     * @param type            "CANDIDAT" ou "RECRUTEUR"
     * @param email           adresse email
     * @param password        mot de passe en clair
     * @param nomOrEntreprise si CANDIDAT → nom ; si RECRUTEUR → raison sociale
     * @param prenom          si CANDIDAT → prénom ; si RECRUTEUR → null ou ignoré
     * @return l’entité Utilisateur persistée
     */
    Utilisateur createUser(String type,
            String email,
            String password,
            String nomOrEntreprise,
            String prenom);

    Optional<Utilisateur> findByEmail(String email);

    /**
     * Génère un JWT pour l’utilisateur donné : le “subject” contient l’email,
     * et le claim “roles” contient la chaîne de caractère du rôle (ex.
     * "ROLE_CANDIDAT").
     */
    String generateJwtForUser(Utilisateur user);
}
