// src/app/features/auth/candidat/candidat-home/candidat-home.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Remontez 4 niveaux pour arriver dans "src/app", puis redescendez dans core/services
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-candidat-home',
  templateUrl: './candidat-home.component.html'
})
export class CandidatHomeComponent {
  userEmail: string | null = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const token = this.authService.getToken();
    if (token) {
      // On charge jwt-decode à la volée
      import('jwt-decode').then((module: any) => {
        // Selon la manière dont jwt-decode est exporté :
        //  • module.default est présent si l’import utilise esModuleInterop
        //  • sinon module est déjà la fonction jwt_decode
        const jwt_fn: (t: string) => any = (module.default ?? module) as (t: string) => any;
        const payload: any = jwt_fn(token);
        this.userEmail = payload.sub;
      }).catch(err => {
        console.error('Impossible de décoder le JWT :', err);
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
