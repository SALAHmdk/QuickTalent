// src/app/core/services/recruteur.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Offre } from '../models/offre.model';
import { Recruteur } from '../models/recruteur.model';

@Injectable({
  providedIn: 'root'
})
export class RecruteurService {

  private apiUrl = environment.apiUrl + '/api/recruteurs';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Recruteur[]> {
    return this.http.get<Recruteur[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<Recruteur> {
    return this.http.get<Recruteur>(`${this.apiUrl}/${id}`);
  }

  update(id: number, recruteur: Recruteur): Observable<Recruteur> {
    return this.http.put<Recruteur>(`${this.apiUrl}/${id}`, recruteur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Profil courant : GET /api/recruteurs/me
  getProfile(): Observable<Recruteur> {
    return this.http.get<Recruteur>(`${this.apiUrl}/me`);
  }

  // Offres du recruteur : GET /api/recruteurs/me/offres
  getMyOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/me/offres`);
  }

  // POST /api/recruteurs/me/offres  -> créer une offre
  createOffre(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(`${this.apiUrl}/me/offres`, offre);
  }

  // DELETE /api/recruteurs/me/offres/{id}
  deleteMyOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/me/offres/${id}`);
  }

  // GET /api/recruteurs/me/offres/{id}/candidatures  -> candidatures reçues pour une offre
  getCandidaturesParOffre(offreId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/me/offres/${offreId}/candidatures`);
  }
}
