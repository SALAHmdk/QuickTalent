package Plateform.QuickTalent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Plateform.QuickTalent.entite.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByEmail(String email);
}
