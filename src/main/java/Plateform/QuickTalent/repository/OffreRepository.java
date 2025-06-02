package Plateform.QuickTalent.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Plateform.QuickTalent.entite.Offre;

public interface OffreRepository extends JpaRepository<Offre, Long> {
    List<Offre> findByVilleContainingIgnoreCase(String ville);

    List<Offre> findByTitreContainingIgnoreCase(String titre);

    List<Offre> findByRecruteurId(Long recruteurId);

    List<Offre> findByTitreAndVilleIgnoreCase(String titre, String ville);

    List<Offre> findByTitreIgnoreCase(String titre);

    List<Offre> findByVilleIgnoreCase(String ville);
}
