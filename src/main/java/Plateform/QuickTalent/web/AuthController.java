package Plateform.QuickTalent.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Plateform.QuickTalent.entite.Candidat;
import Plateform.QuickTalent.entite.Recruteur;
import Plateform.QuickTalent.service.ServiceRecrutement;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private ServiceRecrutement service;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // --- Inscription Candidat ---
    @PostMapping("/register/candidat")
    public String registerCandidat(@RequestBody Candidat candidat) {
        // Encoder le mot de passe
        candidat.setPassword(passwordEncoder.encode(candidat.getPassword()));
        service.ajouterCandidat(candidat);
        return "Candidat enregistré";
    }

    // --- Inscription Recruteur ---
    @PostMapping("/register/recruteur")
    public String registerRecruteur(@RequestBody Recruteur recruteur) {
        recruteur.setPassword(passwordEncoder.encode(recruteur.getPassword()));
        service.ajouterRecruteur(recruteur);
        return "Recruteur enregistré";
    }

    // Remarques :
    // - La connexion (login) est gérée automatiquement par Spring Security via
    // /login.
    // - Côté AngularJS, après un POST sur /api/auth/login, Spring Security crée la
    // session.
}
