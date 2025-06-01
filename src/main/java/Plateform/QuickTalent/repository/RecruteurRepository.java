package Plateform.QuickTalent.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Plateform.QuickTalent.entite.Recruteur;

public interface RecruteurRepository extends JpaRepository<Recruteur, Long> {
    // Méthodes personnalisées si nécessaire
}
