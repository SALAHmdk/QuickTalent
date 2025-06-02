// src/app/features/auth/login/login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// Remonter 4 niveaux pour arriver dans "src/app", puis redescendre dans "core/services"
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        this.toastr.success('Connexion réussie', 'Succès');
        const token = res.token;

        // Décoder le token pour extraire les rôles et rediriger en conséquence
        import('jwt-decode')
          .then((jwt_decode: any) => {
            // On appelle directement jwt_decode(token), sans ".default"
            const payload: any = jwt_decode(token);

            if (payload.roles.includes('ROLE_CANDIDAT')) {
              this.router.navigate(['/candidat/home']);
            } else if (payload.roles.includes('ROLE_RECRUTEUR')) {
              this.router.navigate(['/recruteur/home']);
            } else {
              this.router.navigate(['/']);
            }
          })
          .catch(err => {
            console.error('Erreur lors du décodage du JWT :', err);
            // En cas d’erreur, on redirige vers la page d’accueil
            this.router.navigate(['/']);
          });
      },
      error: err => {
        this.loading = false;
        this.toastr.error('Identifiants invalides', 'Erreur');
      }
    });
  }
}
