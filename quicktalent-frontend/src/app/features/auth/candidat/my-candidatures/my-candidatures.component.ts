// src/app/features/candidat/my-candidatures/my-candidatures.component.ts

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Candidature } from '../../../../core/models/candidature.model';
import { CandidatService } from '../../../../core/services/candidat.service';

@Component({
  selector: 'app-my-candidatures',
  templateUrl: './my-candidatures.component.html'
})
export class MyCandidaturesComponent implements OnInit {

  candidatures: Candidature[] = [];
  loading = false;

  constructor(
    private candidatService: CandidatService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCandidatures();
  }

  loadCandidatures() {
    this.loading = true;
    this.candidatService.getMyCandidatures().subscribe({
      next: res => {
        this.candidatures = res;
        this.loading = false;
      },
      error: err => {
        this.toastr.error('Impossible de charger vos candidatures', 'Erreur');
        this.loading = false;
      }
    });
  }

  deleteCandidature(id: number | undefined) {
    if (!id) { return; }
    this.candidatService.deleteMyCandidature(id).subscribe({
      next: () => {
        this.toastr.success('Candidature supprimée', 'Succès');
        this.loadCandidatures();
      },
      error: err => {
        this.toastr.error('Erreur lors de la suppression', 'Erreur');
      }
    });
  }
}
