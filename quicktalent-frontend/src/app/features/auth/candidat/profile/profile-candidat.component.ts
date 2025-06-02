// src/app/features/candidat/profile/profile-candidat.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidat } from '../../../../core/models/candidat.model';
import { CandidatService } from '../../../../core/services/candidat.service';

@Component({
  selector: 'app-profile-candidat',
  templateUrl: './profile-candidat.component.html'
})
export class ProfileCandidatComponent implements OnInit {

  candidat: Candidat = { nom: '', prenom: '', email: '' };
  loading = false;

  constructor(
    private candidatService: CandidatService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.candidatService.getProfile().subscribe({
      next: res => {
        this.candidat = res;
      },
      error: err => {
        this.toastr.error('Impossible de charger le profil', 'Erreur');
        this.router.navigate(['/auth/login']);
      }
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.candidat.id) {
      this.candidatService.update(this.candidat.id, this.candidat).subscribe({
        next: res => {
          this.toastr.success('Profil mis à jour', 'Succès');
          this.loading = false;
        },
        error: err => {
          this.toastr.error('Erreur lors de la mise à jour', 'Erreur');
          this.loading = false;
        }
      });
    }
  }
}
