package Plateform.QuickTalent.web;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Plateform.QuickTalent.entite.Candidat;
import Plateform.QuickTalent.entite.Candidature;
import Plateform.QuickTalent.service.ServiceRecrutement;

@RestController
@RequestMapping("/api/candidats")
public class CandidatController {

    @Autowired
    private ServiceRecrutement service;

    // Récupérer les informations du candidat connecté
    @GetMapping("/me")
    public Candidat getProfile(Authentication authentication) {
        String email = authentication.getName();
        return (Candidat) service.findByEmail(email).orElse(null);
    }

    // Lister les candidatures du candidat connecté
    @GetMapping("/me/candidatures")
    public List<Candidature> getMesCandidatures(Authentication authentication) {
        Candidat c = (Candidat) service.findByEmail(authentication.getName()).orElse(null);
        if (c != null) {
            return service.listerCandidaturesParCandidat(c.getId());
        }
        return null;
    }

    // Postuler à une offre
    @PostMapping("/me/candidatures")
    public Candidature postuler(@RequestBody Candidature candidature, Authentication authentication) {
        Candidat c = (Candidat) service.findByEmail(authentication.getName()).orElse(null);
        if (c != null) {
            candidature.setCandidat(c);
            candidature.setDateCandidature(LocalDate.now().toString());
            return service.ajouterCandidature(candidature);
        }
        return null;
    }

    // Supprimer une candidature (par id) si elle appartient au candidat
    @DeleteMapping("/me/candidatures/{id}")
    public String supprimerCandidature(@PathVariable Long id, Authentication authentication) {
        Candidat c = (Candidat) service.findByEmail(authentication.getName()).orElse(null);
        Candidature cand = service.listerCandidaturesParCandidat(c.getId())
                .stream().filter(x -> x.getId().equals(id)).findFirst().orElse(null);
        if (cand != null) {
            service.supprimerCandidature(id);
            return "Candidature supprimée";
        }
        return "Accès refusé";
    }
}
