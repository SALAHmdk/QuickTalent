// src/app/features/recruteur/my-offres/my-offres.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offre } from '../../../../app/core/models/offre.model';
import { RecruteurService } from '../../../../app/core/services/recruteur.service';

@Component({
  selector: 'app-my-offres',
  templateUrl: './my-offres.component.html'
})
export class MyOffresComponent implements OnInit {

  offres: Offre[] = [];
  loading = false;

  constructor(
    private recruteurService: RecruteurService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadMyOffres();
  }

  loadMyOffres() {
    this.loading = true;
    this.recruteurService.getMyOffres().subscribe({
      next: res => {
        this.offres = res;
        this.loading = false;
      },
      error: err => {
        this.toastr.error('Impossible de charger vos offres', 'Erreur');
        this.loading = false;
      }
    });
  }

  deleteOffre(id: number | undefined) {
    if (!id) { return; }
    this.recruteurService.deleteMyOffre(id).subscribe({
      next: () => {
        this.toastr.success('Offre supprimée', 'Succès');
        this.loadMyOffres();
      },
      error: err => {
        this.toastr.error('Erreur lors de la suppression', 'Erreur');
      }
    });
  }

  détailsCandidatures(id: number | undefined) {
    if (id) {
      this.router.navigate(['/recruteur/my-offres', id, 'candidatures']);
    }
  }
}
