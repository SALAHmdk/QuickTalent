// src/main/java/Plateform/QuickTalent/web/dto/RegisterRequest.java
package Plateform.QuickTalent.web.dto;

/**
 * DTO pour la requête d'inscription d'un utilisateur (Candidat ou Recruteur).
 * Le champ "type" doit valoir soit "CANDIDAT", soit "RECRUTEUR".
 * Si "CANDIDAT", on utilisera getNom() et getPrenom().
 * Si "RECRUTEUR", on utilisera getNomOrEntreprise() (raison sociale) et
 * ignorera getPrenom().
 */
public class RegisterRequest {
    private String type; // "CANDIDAT" ou "RECRUTEUR"
    private String email;
    private String password;
    private String nomOrEntreprise; // si candidat → nom ; si recruteur → raison sociale
    private String prenom; // si candidat → prénom ; si recruteur → ignoré

    public RegisterRequest() {
    }

    public RegisterRequest(String type,
            String email,
            String password,
            String nomOrEntreprise,
            String prenom) {
        this.type = type;
        this.email = email;
        this.password = password;
        this.nomOrEntreprise = nomOrEntreprise;
        this.prenom = prenom;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNomOrEntreprise() {
        return nomOrEntreprise;
    }

    public void setNomOrEntreprise(String nomOrEntreprise) {
        this.nomOrEntreprise = nomOrEntreprise;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
}
