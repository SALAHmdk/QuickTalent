// src/main/java/Plateform/QuickTalent/web/dto/LoginRequest.java
package Plateform.QuickTalent.web.dto;

/**
 * DTO pour la requête de connexion (login).
 * Contient l'email et le mot de passe fournis par le client.
 */
public class LoginRequest {
    private String email;
    private String password;

    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
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
}
