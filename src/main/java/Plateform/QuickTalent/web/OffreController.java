package Plateform.QuickTalent.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Plateform.QuickTalent.entite.Offre;
import Plateform.QuickTalent.service.ServiceRecrutement;

@RestController
@RequestMapping("/api/offres")
public class OffreController {

    @Autowired
    private ServiceRecrutement service;

    // Lister toutes les offres (publique)
    @GetMapping
    public List<Offre> getAllOffres() {
        return service.listerOffres();
    }

    // Filtrer par ville (paramètre “ville” facultatif)
    @GetMapping(params = "ville")
    public List<Offre> getByVille(@RequestParam String ville) {
        return service.listerOffresParVille(ville);
    }

    // Filtrer par titre (paramètre “titre” facultatif)
    @GetMapping(params = "titre")
    public List<Offre> getByTitre(@RequestParam String titre) {
        return service.listerOffresParTitre(titre);
    }

    // Récupérer une offre par id (publique)
    @GetMapping("/{id}")
    public Offre getOffre(@PathVariable Long id) {
        return service.getOffre(id).orElse(null);
    }
}
