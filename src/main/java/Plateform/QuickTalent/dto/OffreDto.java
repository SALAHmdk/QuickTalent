package Plateform.QuickTalent.dto;

/**
 * DTO représentant une offre pour l’affichage côté front (dashboard recruteur).
 */
public class OffreDto {

    private Long id;
    private String titre;
    private int nombreCandidatures;

    public OffreDto() {
    }

    public OffreDto(Long id, String titre, int nombreCandidatures) {
        this.id = id;
        this.titre = titre;
        this.nombreCandidatures = nombreCandidatures;
    }

    // --- Getters / Setters ---
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

    public int getNombreCandidatures() {
        return nombreCandidatures;
    }

    public void setNombreCandidatures(int nombreCandidatures) {
        this.nombreCandidatures = nombreCandidatures;
    }
}
