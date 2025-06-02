// src/app/core/models/offre.model.ts

import { Recruteur } from './recruteur.model';

export interface Offre {
  id?: number;
  titre: string;
  ville: string;
  description: string;
  recruteur?: Recruteur;        // Pour afficher le recruteur qui a posté l’offre

}
