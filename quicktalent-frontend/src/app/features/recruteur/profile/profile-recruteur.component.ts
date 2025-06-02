// src/app/features/recruteur/profile/profile-recruteur.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recruteur } from '../../../../app/core/models/recruteur.model';
import { RecruteurService } from '../../../../app/core/services/recruteur.service';

@Component({
  selector: 'app-profile-recruteur',
  templateUrl: './profile-recruteur.component.html'
})
export class ProfileRecruteurComponent implements OnInit {

  recruteur: Recruteur = { nom: '', email: '', password: '', entreprise: '', role: 'ROLE_RECRUTEUR' };
  loading = false;

  constructor(
    private recruteurService: RecruteurService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.recruteurService.getProfile().subscribe({
      next: res => {
        this.recruteur = res;
      },
      error: err => {
        this.toastr.error('Impossible de charger le profil', 'Erreur');
        this.router.navigate(['/auth/login']);
      }
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.recruteur.id) {
      this.recruteurService.update(this.recruteur.id, this.recruteur).subscribe({
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
