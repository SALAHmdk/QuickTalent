// src/main/java/Plateform/QuickTalent/web/dto/LoginResponse.java
package Plateform.QuickTalent.web.dto;

/**
 * DTO pour la réponse de connexion (login).
 * Contient le token JWT, l'email et le rôle de l'utilisateur.
 */
public class LoginResponse {
    private String token;
    private String email;
    private String role;

    public LoginResponse() {
    }

    public LoginResponse(String token, String email, String role) {
        this.token = token;
        this.email = email;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
