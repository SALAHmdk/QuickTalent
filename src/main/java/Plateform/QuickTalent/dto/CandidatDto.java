package Plateform.QuickTalent.dto;

/**
 * DTO minimal pour exposer les informations d’un Candidat en REST.
 */
public class CandidatDto {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    // … autres champs si besoin

    // Constructeurs (vide, puis éventuellement un constructeur complet)
    public CandidatDto() {
    }

    public CandidatDto(Long id, String nom, String prenom, String email) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
    }

    // Getters / Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
