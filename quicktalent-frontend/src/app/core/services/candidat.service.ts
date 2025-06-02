// src/app/core/services/candidat.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Candidat } from '../models/candidat.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  private apiUrl = environment.apiUrl + '/api/candidats';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.apiUrl}/${id}`);
  }

  update(id: number, candidat: Candidat): Observable<Candidat> {
    return this.http.put<Candidat>(`${this.apiUrl}/${id}`, candidat);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Endpoints “/api/candidats/me” (profil courant) :

  getProfile(): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.apiUrl}/me`);
  }

  // Endpoint “/api/candidats/me/candidatures” :
  getMyCandidatures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/me/candidatures`);
  }

  // POST /api/candidats/me/candidatures  -> postuler
  apply(candidature: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/me/candidatures`, candidature);
  }

  deleteMyCandidature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/me/candidatures/${id}`);
  }
}
