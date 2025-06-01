package Plateform.QuickTalent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Plateform.QuickTalent.entite.Utilisateur;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    /**
     * Méthode Spring Data pour récupérer un utilisateur par adresse email.
     * Nécessaire à ServiceRecrutement pour pouvoir appeler
     * utilisateurRepo.findByEmail(...)
     */
    Optional<Utilisateur> findByEmail(String email);

}
