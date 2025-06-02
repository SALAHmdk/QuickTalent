// src/app/core/services/auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthResponse } from '../models/auth-response.model';
import { Candidat } from '../models/candidat.model';
import { Recruteur } from '../models/recruteur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/api/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      { email, password }
    ).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  registerCandidat(candidat: Candidat): Observable<string> {
    // Renvoie simplement un message (ou le token) selon votre backend
    return this.http.post<string>(`${this.apiUrl}/register/candidat`, candidat);
  }

  registerRecruteur(recruteur: Recruteur): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register/recruteur`, recruteur);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }
}
