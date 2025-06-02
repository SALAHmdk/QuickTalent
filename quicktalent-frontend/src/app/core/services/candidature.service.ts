// src/app/core/services/candidature.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Candidature } from '../models/candidature.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  private apiUrl = environment.apiUrl + '/api/candidats/me/candidatures';

  constructor(private http: HttpClient) { }

  // GET /api/candidats/me/candidatures
  getMyCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.apiUrl);
  }

  // POST /api/candidats/me/candidatures
  create(candidature: Candidature): Observable<Candidature> {
    return this.http.post<Candidature>(this.apiUrl, candidature);
  }

  // DELETE /api/candidats/me/candidatures/{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
