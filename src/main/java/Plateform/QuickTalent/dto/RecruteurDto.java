package Plateform.QuickTalent.dto;

/**
 * DTO minimal pour exposer un Recruteur via l’API REST.
 */
public class RecruteurDto {
    private Long id;
    private String entreprise;

    public RecruteurDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }
}
