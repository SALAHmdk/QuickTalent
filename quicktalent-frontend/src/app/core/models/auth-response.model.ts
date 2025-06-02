// src/app/core/models/auth-response.model.ts

export interface AuthResponse {
  token: string;
  // refreshToken?: string; // à ajouter si vous gérez les refresh tokens
}
