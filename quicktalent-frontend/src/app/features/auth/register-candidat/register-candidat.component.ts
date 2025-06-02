// src/app/features/auth/register-candidat/register-candidat.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidat } from '../../../../app/core/models/candidat.model';
import { AuthService } from '../../../../app/core/services/auth.service';

@Component({
  selector: 'app-register-candidat',
  templateUrl: './register-candidat.component.html'
})
export class RegisterCandidatComponent {

  candidat: Candidat = {
    nom: '',
    prenom: '',
    email: '',
  };

  password: string = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit() {
    this.loading = true;
    // On envoie l’objet qui correspond à l’entité Candidat attendue par le backend
    // Souvent le backend ignore le champ password pour la création du candidat.
    // Si votre backend attend bien un "password", ajoutez-le dans l’entité Candidat TS.
    (this.candidat as any).password = this.password;

    this.authService.registerCandidat(this.candidat).subscribe({
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
