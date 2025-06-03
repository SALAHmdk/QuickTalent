// src/app/features/auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit(): void {
    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        this.toastr.success('Connexion réussie');
        const token = res.token;

        // DÉCODAGE DU JWT via import dynamique
        import('jwt-decode')
          .then((mod: any) => {
            // On dit à TS que 'mod' est un any, pour éviter l’erreur de conversion de type
            const jwt_decode: (token: string) => any = mod.default;
            try {
              const payload: any = jwt_decode(token);
              if (payload.roles.includes('ROLE_CANDIDAT')) {
                this.router.navigate(['/candidat/home']);
              } else if (payload.roles.includes('ROLE_RECRUTEUR')) {
                this.router.navigate(['/recruteur/home']);
              } else {
                this.router.navigate(['/']);
              }
            } catch (err) {
              console.error('Erreur lors du décodage du token JWT :', err);
              this.toastr.error('Impossible de décoder le token', 'Erreur');
            } finally {
              this.loading = false;
            }
          })
          .catch(err => {
            console.error('Impossible de charger jwt-decode :', err);
            this.toastr.error('Erreur interne', 'Décodage JWT');
            this.loading = false;
          });
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Identifiants invalides', 'Erreur');
      }
    });
  }
}
