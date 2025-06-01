package Plateform.QuickTalent.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Plateform.QuickTalent.entite.Candidat;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {
    // Vous pouvez ajouter des méthodes spécifiques ici si besoin
}
