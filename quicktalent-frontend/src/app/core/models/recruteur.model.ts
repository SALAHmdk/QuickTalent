// src/app/core/models/recruteur.model.ts

export interface Recruteur {
  id?: number;
  nom: string;         // Peut être nom de l’entreprise
  email: string;
  password: string;    // uniquement lors de l’inscription
  role: string;        // ex: "ROLE_RECRUTEUR"
  entreprise: string;  // facultatif si vous voulez une relation imbriquée
}
