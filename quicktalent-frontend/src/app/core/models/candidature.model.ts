// src/app/core/models/candidature.model.ts

import { Candidat } from './candidat.model';
import { Offre } from './offre.model';

export interface Candidature {
  id?: number;
  candidat?: Candidat;
  offre?: Offre;
  datePostulation?: string; // ou Date, selon ce que renvoie votre backend
}
