package Plateform.QuickTalent.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import Plateform.QuickTalent.entite.Candidat;
import Plateform.QuickTalent.entite.Recruteur;
import Plateform.QuickTalent.entite.Utilisateur;
import Plateform.QuickTalent.repository.UtilisateurRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UtilisateurRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Ces deux propriétés doivent être définies dans application.properties ou
    // application.yml
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    @Override
    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public Optional<Utilisateur> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    /**
     * Type peut être "CANDIDAT" ou "RECRUTEUR".
     * Pour un candidat, on fixe prénom + nom + role="ROLE_CANDIDAT".
     * Pour un recruteur, on fixe entreprise + role="ROLE_RECRUTEUR".
     */
    @Override
    public Utilisateur createUser(String type,
            String email,
            String password,
            String nomOrEntreprise,
            String prenom) {

        Utilisateur u;
        if ("CANDIDAT".equalsIgnoreCase(type)) {
            Candidat c = new Candidat();
            c.setNom(nomOrEntreprise);
            c.setPrenom(prenom);
            c.setRole("ROLE_CANDIDAT");
            c.setEmail(email);
            c.setPassword(passwordEncoder.encode(password));
            u = c;

        } else {
            // On suppose que type vaut "RECRUTEUR"
            Recruteur r = new Recruteur();
            r.setEntreprise(nomOrEntreprise);
            r.setRole("ROLE_RECRUTEUR");
            r.setEmail(email);
            r.setPassword(passwordEncoder.encode(password));
            u = r;
        }

        return userRepo.save(u);
    }

    /**
     * Génère le JWT en incluant le champ "subject" = email,
     * puis un claim "roles" prenant la valeur utilisateur.getRole().
     */
    @Override
    public String generateJwtForUser(Utilisateur user) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("roles", user.getRole())
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

}
