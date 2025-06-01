package Plateform.QuickTalent.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Plateform.QuickTalent.entite.Candidat;
import Plateform.QuickTalent.entite.Candidature;
import Plateform.QuickTalent.entite.Offre;
import Plateform.QuickTalent.entite.Recruteur;
import Plateform.QuickTalent.entite.Utilisateur;
import Plateform.QuickTalent.repository.CandidatRepository;
import Plateform.QuickTalent.repository.CandidatureRepository;
import Plateform.QuickTalent.repository.OffreRepository;
import Plateform.QuickTalent.repository.RecruteurRepository;
import Plateform.QuickTalent.repository.UtilisateurRepository;

@Service
public class ServiceRecrutement {

    @Autowired
    private CandidatRepository candidatRepo;

    @Autowired
    private RecruteurRepository recruteurRepo;

    @Autowired
    private OffreRepository offreRepo;

    @Autowired
    private CandidatureRepository candidatureRepo;

    @Autowired
    private UtilisateurRepository utilisateurRepo;

    // --- Méthodes métier ---

    public Candidat ajouterCandidat(Candidat c) {
        c.setRole("ROLE_CANDIDAT");
        return candidatRepo.save(c);
    }

    public Recruteur ajouterRecruteur(Recruteur r) {
        r.setRole("ROLE_RECRUTEUR");
        return recruteurRepo.save(r);
    }

    public Optional<Utilisateur> findByEmail(String email) {
        return utilisateurRepo.findByEmail(email);
    }

    public Offre ajouterOffre(Offre o) {
        return offreRepo.save(o);
    }

    public List<Offre> listerOffres() {
        return offreRepo.findAll();
    }

    public List<Offre> listerOffresParVille(String ville) {
        return offreRepo.findByVilleContainingIgnoreCase(ville);
    }

    public List<Offre> listerOffresParTitre(String titre) {
        return offreRepo.findByTitreContainingIgnoreCase(titre);
    }

    public List<Offre> listerOffresParRecruteur(Long recruteurId) {
        return offreRepo.findByRecruteurId(recruteurId);
    }

    public void supprimerOffre(Long id) {
        offreRepo.deleteById(id);
    }

    public Optional<Offre> getOffre(Long id) {
        return offreRepo.findById(id);
    }

    public Candidature ajouterCandidature(Candidature c) {
        return candidatureRepo.save(c);
    }

    public List<Candidature> listerCandidaturesParCandidat(Long candidatId) {
        return candidatureRepo.findByCandidatId(candidatId);
    }

    public List<Candidature> listerCandidaturesParOffre(Long offreId) {
        return candidatureRepo.findByOffreId(offreId);
    }

    public void supprimerCandidature(Long id) {
        candidatureRepo.deleteById(id);
    }
}
