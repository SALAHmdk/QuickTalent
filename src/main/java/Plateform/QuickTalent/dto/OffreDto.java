package Plateform.QuickTalent.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * DTO minimal pour exposer les informations d’une Offre en REST.
 */
@Schema(description = "DTO représentant une offre d’emploi")
public class OffreDto {

    @Schema(description = "Identifiant unique de l’offre", example = "15")
    private Long id;

    @Schema(description = "Titre du poste", example = "Développeur Java")
    private String titre;

    @Schema(description = "Ville où se situe le poste", example = "Paris")
    private String ville;

    @Schema(description = "Description détaillée de l’offre", example = "Nous recherchons un développeur Java senior…")
    private String description;

    @Schema(description = "Identifiant du recruteur ayant publié cette offre", example = "5")
    private Long recruteurId;

    // Constructeurs

    public OffreDto() {
    }

    public OffreDto(Long id, String titre, String ville, String description, Long recruteurId) {
        this.id = id;
        this.titre = titre;
        this.ville = ville;
        this.description = description;
        this.recruteurId = recruteurId;
    }

    // Getters / Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getRecruteurId() {
        return recruteurId;
    }

    public void setRecruteurId(Long recruteurId) {
        this.recruteurId = recruteurId;
    }
}
