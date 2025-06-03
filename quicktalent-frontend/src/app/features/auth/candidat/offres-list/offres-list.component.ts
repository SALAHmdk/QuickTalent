// src/app/features/auth/candidat/offres-list/offres-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Offre } from '../../../../core/models/offre.model';
import { OffreService } from '../../../../core/services/offre.service';

@Component({
  selector: 'app-offres-list',
  templateUrl: './offres-list.component.html',
  styleUrls: ['./offres-list.component.css']
})
export class OffresListComponent implements OnInit {
  offres: Offre[] = [];
  loading = false;

  titreFilter = '';
  villeFilter = '';

  constructor(private offreService: OffreService) { }

  ngOnInit(): void {
    this.loading = true;
    this.offreService.getAllOffres().subscribe({
      next: data => {
        this.offres = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // Filtre simple côté client (vous pouvez l’agrandir côté backend si besoin)
  get filteredOffres(): Offre[] {
    return this.offres.filter(o =>
      o.titre.toLowerCase().includes(this.titreFilter.toLowerCase()) &&
      o.ville.toLowerCase().includes(this.villeFilter.toLowerCase())
    );
  }
}
