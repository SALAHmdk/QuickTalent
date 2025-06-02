// src/app/features/candidat/offres-list/offres-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offre } from '../../../../core/models/offre.model';
import { OffreService } from '../../../../core/services/offre.service';

@Component({
  selector: 'app-offres-list',
  templateUrl: './offres-list.component.html'
})
export class OffresListComponent implements OnInit {

  offres: Offre[] = [];
  titreFilter: string = '';
  villeFilter: string = '';
  loading = false;

  constructor(
    private offreService: OffreService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres() {
    this.loading = true;
    this.offreService.getAll(this.titreFilter, this.villeFilter).subscribe({
      next: res => {
        this.offres = res;
        this.loading = false;
      },
      error: err => {
        this.toastr.error('Impossible de charger les offres', 'Erreur');
        this.loading = false;
      }
    });
  }

  onFilter() {
    this.loadOffres();
  }

  viewDetails(offre: Offre) {
    if (offre.id) {
      this.router.navigate(['/candidat/offres', offre.id]);
    }
  }
}
