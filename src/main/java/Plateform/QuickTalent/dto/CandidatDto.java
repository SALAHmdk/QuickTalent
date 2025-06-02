package Plateform.QuickTalent.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * DTO minimal pour exposer les informations d’un Candidat en REST.
 */
@Schema(description = "DTO représentant un candidat")
public class CandidatDto {

    @Schema(description = "Identifiant unique du candidat", example = "42")
    private Long id;

    @Schema(description = "Nom du candidat", example = "Dupond")
    private String nom;

    @Schema(description = "Prénom du candidat", example = "Jean")
    private String prenom;

    @Schema(description = "Email du candidat", example = "jean.dupond@example.com")
    private String email;

    // … autres champs si besoin

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
