import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidature } from '../models/candidature.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private baseUrl = 'http://localhost:8080/api'; // Remplacez par votre URL API

  constructor(private http: HttpClient) { }

  // Correction: La méthode doit retourner un Observable
  getMesCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.baseUrl}/candidatures/mes-candidatures`);
  }

  // Autres méthodes du service...
  postuler(offreId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/candidatures/postuler/${offreId}`, {});
  }

  retirerCandidature(candidatureId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/candidatures/${candidatureId}`);
  }
}
