package Plateform.QuickTalent.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Plateform.QuickTalent.entite.Candidature;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    List<Candidature> findByCandidatId(Long candidatId);

    List<Candidature> findByOffreId(Long offreId);
}
