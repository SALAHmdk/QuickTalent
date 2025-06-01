package Plateform.QuickTalent.dto;

/**
 * DTO représentant une candidature pour l’affichage côté front.
 */
public class CandidatureDto {

    private Long id;
    private String offreTitre;
    private String dateCandidature;
    private String statut;

    public CandidatureDto() {
    }

    public CandidatureDto(Long id, String offreTitre, String dateCandidature, String statut) {
        this.id = id;
        this.offreTitre = offreTitre;
        this.dateCandidature = dateCandidature;
        this.statut = statut;
    }

    // --- Getters / Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOffreTitre() {
        return offreTitre;
    }

    public void setOffreTitre(String offreTitre) {
        this.offreTitre = offreTitre;
    }

    public String getDateCandidature() {
        return dateCandidature;
    }

    public void setDateCandidature(String dateCandidature) {
        this.dateCandidature = dateCandidature;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }
}
