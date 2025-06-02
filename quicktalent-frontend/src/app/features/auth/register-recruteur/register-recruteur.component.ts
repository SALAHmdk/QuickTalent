// src/app/features/auth/register-recruteur/register-recruteur.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recruteur } from '../../../../app/core/models/recruteur.model';
import { AuthService } from '../../../../app/core/services/auth.service';

@Component({
  selector: 'app-register-recruteur',
  templateUrl: './register-recruteur.component.html'
})
export class RegisterRecruteurComponent {

  recruteur: Recruteur = {
    nom: '',
    entreprise: '',
    email: '',
    password: '',
    role: 'ROLE_RECRUTEUR'
  };

  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit() {
    this.loading = true;
    this.authService.registerRecruteur(this.recruteur).subscribe({
      next: res => {
        this.toastr.success('Inscription réussie. Vous pouvez maintenant vous connecter.', 'Succès');
        this.router.navigate(['/auth/login']);
      },
      error: err => {
        this.loading = false;
        this.toastr.error('Erreur lors de l’inscription', 'Erreur');
      }
    });
  }
}
