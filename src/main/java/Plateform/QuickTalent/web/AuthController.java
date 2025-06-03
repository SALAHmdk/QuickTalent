// src/main/java/Plateform/QuickTalent/web/AuthController.java
package Plateform.QuickTalent.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Plateform.QuickTalent.entite.Utilisateur;
import Plateform.QuickTalent.service.UserService;
import Plateform.QuickTalent.web.dto.LoginRequest;
import Plateform.QuickTalent.web.dto.LoginResponse;
import Plateform.QuickTalent.web.dto.RegisterRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserService userService,
            PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Point de terminaison pour l’inscription (Candidat ou Recruteur).
     */
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        // 1) Vérifier que l’email n’existe pas déjà
        if (userService.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Erreur : cet email est déjà utilisé !");
        }

        // 2) Créer un nouvel Utilisateur (Candidat ou Recruteur).
        // Le paramètre "type" doit valoir "CANDIDAT" ou "RECRUTEUR"
        Utilisateur createdUser = userService.createUser(
                request.getType(), // "CANDIDAT" OU "RECRUTEUR"
                request.getEmail(),
                request.getPassword(),
                request.getNomOrEntreprise(),
                request.getPrenom());

        // 3) Retourner un message de succès (avec l’ID généré dans la BD)
        return ResponseEntity
                .ok("Utilisateur créé avec l’ID : " + createdUser.getId());
    }

    /**
     * Point de terminaison pour la connexion. Retourne un JWT + email + role.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // 1) Vérifier qu’il existe bien un utilisateur avec cet email
        Optional<Utilisateur> optUser = userService.findByEmail(request.getEmail());
        if (optUser.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body("Erreur : email introuvable !");
        }

        Utilisateur utilisateur = optUser.get();

        // 2) Vérifier la correspondance mot de passe (brut vs stocké)
        boolean mdpOk = passwordEncoder.matches(
                request.getPassword(),
                utilisateur.getPassword());
        if (!mdpOk) {
            return ResponseEntity
                    .badRequest()
                    .body("Erreur : mot de passe incorrect !");
        }

        // 3) Générer un JWT
        String jwt = userService.generateJwtForUser(utilisateur);

        // 4) Retourner la réponse : token + email + role
        LoginResponse response = new LoginResponse(
                jwt,
                utilisateur.getEmail(),
                utilisateur.getRole() // -> champ unique "role" défini dans Utilisateur
        );

        return ResponseEntity.ok(response);
    }
}
