package Plateform.QuickTalent.web;

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

import Plateform.QuickTalent.entite.Candidature;
import Plateform.QuickTalent.entite.Offre;
import Plateform.QuickTalent.entite.Recruteur;
import Plateform.QuickTalent.service.ServiceRecrutement;

@RestController
@RequestMapping("/api/recruteurs")
public class RecruteurController {

    @Autowired
    private ServiceRecrutement service;

    // Récupérer le profil du recruteur connecté
    @GetMapping("/me")
    public Recruteur getProfile(Authentication authentication) {
        return (Recruteur) service.findByEmail(authentication.getName()).orElse(null);
    }

    // Lister les offres du recruteur connecté
    @GetMapping("/me/offres")
    public List<Offre> getMesOffres(Authentication authentication) {
        Recruteur r = (Recruteur) service.findByEmail(authentication.getName()).orElse(null);
        if (r != null) {
            return service.listerOffresParRecruteur(r.getId());
        }
        return null;
    }

    // Créer une nouvelle offre
    @PostMapping("/me/offres")
    public Offre ajouterOffre(@RequestBody Offre offre, Authentication authentication) {
        Recruteur r = (Recruteur) service.findByEmail(authentication.getName()).orElse(null);
        if (r != null) {
            offre.setRecruteur(r);
            return service.ajouterOffre(offre);
        }
        return null;
    }

    // Supprimer une offre (par id) si elle appartient au recruteur
    @DeleteMapping("/me/offres/{id}")
    public String supprimerOffre(@PathVariable Long id, Authentication authentication) {
        Recruteur r = (Recruteur) service.findByEmail(authentication.getName()).orElse(null);
        Offre o = service.getOffre(id).orElse(null);
        if (o != null && o.getRecruteur().getId().equals(r.getId())) {
            service.supprimerOffre(id);
            return "Offre supprimée";
        }
        return "Accès refusé";
    }

    // Lister les candidatures pour une offre donnée (appartenant au recruteur)
    @GetMapping("/me/offres/{id}/candidatures")
    public List<Candidature> getCandidaturesParOffre(@PathVariable Long id, Authentication authentication) {
        Recruteur r = (Recruteur) service.findByEmail(authentication.getName()).orElse(null);
        Offre o = service.getOffre(id).orElse(null);
        if (o != null && o.getRecruteur().getId().equals(r.getId())) {
            return service.listerCandidaturesParOffre(id);
        }
        return null;
    }
}
