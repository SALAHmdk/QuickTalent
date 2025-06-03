package Plateform.QuickTalent.entite;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "candidat")
public class Candidat extends Utilisateur {

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @OneToMany(mappedBy = "candidat", cascade = CascadeType.ALL)
    private List<Candidature> candidatures;

    // ----- Getters & setters spécifiques à Candidat -----

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

    public List<Candidature> getCandidatures() {
        return candidatures;
    }

    public void setCandidatures(List<Candidature> candidatures) {
        this.candidatures = candidatures;
    }

    // Ne pas redéfinir setRole(...) : on hérite de Utilisateur.setRole(...)
    // (donc on supprime complètement le bloc ci-dessous)

    // public void setRole(String string) {
    // throw new UnsupportedOperationException("Unimplemented method 'setRole'");
    // }
}
