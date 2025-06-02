// src/app/features/recruteur/candidatures-par-offre/candidatures-par-offre.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidature } from '../../../../app/core/models/candidature.model';
import { RecruteurService } from '../../../../app/core/services/recruteur.service';

@Component({
  selector: 'app-candidatures-par-offre',
  templateUrl: './candidatures-par-offre.component.html'
})
export class CandidaturesParOffreComponent implements OnInit {

  candidatures: Candidature[] = [];
  loading = false;
  offreId: number | null = null;

  constructor(
    private recruteurService: RecruteurService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.offreId = idParam ? +idParam : null;
    if (this.offreId) {
      this.loadCandidatures();
    } else {
      this.router.navigate(['/recruteur/my-offres']);
    }
  }

  loadCandidatures() {
    if (!this.offreId) { return; }
    this.loading = true;
    this.recruteurService.getCandidaturesParOffre(this.offreId).subscribe({
      next: res => {
        this.candidatures = res;
        this.loading = false;
      },
      error: err => {
        this.toastr.error('Impossible de charger les candidatures', 'Erreur');
        this.loading = false;
      }
    });
  }
}
