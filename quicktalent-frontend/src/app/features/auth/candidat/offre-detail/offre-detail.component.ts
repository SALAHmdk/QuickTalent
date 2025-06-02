// src/app/features/candidat/offre-detail/offre-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offre } from '../../../../core/models/offre.model';
import { CandidatService } from '../../../../core/services/candidat.service';
import { OffreService } from '../../../../core/services/offre.service';

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html'
})
export class OffreDetailComponent implements OnInit {

  offre: Offre | null = null;
  loading = false;
  postulant = false; // s’il a déjà postulé (facultatif à implémenter)
  currentUserEmail: string | null = '';

  constructor(
    private offreService: OffreService,
    private candidatService: CandidatService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    if (id) {
      this.loadOffre(id);
    } else {
      this.router.navigate(['/candidat/offres']);
    }

    // Vous pouvez récupérer l’email pour, par exemple, vérifier si déjà postulé
    // (À implémenter selon votre backend)
  }

  loadOffre(id: number) {
    this.loading = true;
    this.offreService.getById(id).subscribe({
      next: res => {
        this.offre = res;
        this.loading = false;
      },
      error: err => {
        this.toastr.error('Impossible de charger l’offre', 'Erreur');
        this.router.navigate(['/candidat/offres']);
      }
    });
  }

  postuler() {
    if (!this.offre || !this.offre.id) { return; }
    this.candidatService.apply({ offre: { id: this.offre.id } }).subscribe({
      next: res => {
        this.toastr.success('Candidature envoyée', 'Succès');
        // Vous pouvez rediriger vers “mes candidatures” :
        this.router.navigate(['/candidat/mes-candidatures']);
      },
      error: err => {
        this.toastr.error('Erreur lors de la postulation', 'Erreur');
      }
    });
  }
}
