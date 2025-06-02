// src/app/core/services/offre.service.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Offre } from '../models/offre.model';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private apiUrl = environment.apiUrl + '/api/offres';

  constructor(private http: HttpClient) { }

  getAll(titre?: string, ville?: string): Observable<Offre[]> {
    let params = new HttpParams();
    if (titre) {
      params = params.set('titre', titre);
    }
    if (ville) {
      params = params.set('ville', ville);
    }
    return this.http.get<Offre[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/${id}`);
  }
}
