package Plateform.QuickTalent.entite;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "recruteur")
public class Recruteur extends Utilisateur {

    @Column(nullable = false)
    private String entreprise;

    @OneToMany(mappedBy = "recruteur", cascade = CascadeType.ALL)
    private List<Offre> offres;

    // ----- Getters & setters spécifiques à Recruteur -----

    public String getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }

    public List<Offre> getOffres() {
        return offres;
    }

    public void setOffres(List<Offre> offres) {
        this.offres = offres;
    }

    // Ne pas redéfinir setRole(...) : on hérite de Utilisateur.setRole(...)
    // (donc on supprime complètement le bloc ci-dessous)

    // public void setRole(String string) {
    // throw new UnsupportedOperationException("Unimplemented method 'setRole'");
    // }
}
