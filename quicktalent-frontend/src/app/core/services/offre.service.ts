// src/app/features/auth/candidat/offres-list/offres-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Offre } from '../models/offre.model';
import { OffreService } from '../services/offre.service'; // <— chemin précis vers OffreService

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

  // SonarQube suggère readonly car on ne réassigne jamais offreService une fois injecté
  constructor(private readonly offreService: OffreService) { }

  ngOnInit(): void {
    this.chargerOffres();
  }

  /** Va récupérer la liste des offres depuis le backend en prenant en compte
   *  les filtres titre et ville (s’ils sont renseignés). */
  chargerOffres(): void {
    this.loading = true;

    // Appel à getAll du service : getAll(titre?: string, ville?: string)
    this.offreService.getAll(this.titreFilter, this.villeFilter).subscribe({
      next: (data: Offre[]) => {
        this.offres = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // Ici, vous pouvez déclencher un message d’erreur si vous le souhaitez
      }
    });
  }

  /** Méthode déclenchée lorsqu’on clique sur le bouton “Rechercher” dans le template */
  onRechercher(): void {
    this.chargerOffres();
  }

  /** Filtrage additionnel côté client (optionnel) */
  get filteredOffres(): Offre[] {
    return this.offres.filter(o =>
      o.titre.toLowerCase().includes(this.titreFilter.toLowerCase()) &&
      o.ville.toLowerCase().includes(this.villeFilter.toLowerCase())
    );
  }
}
