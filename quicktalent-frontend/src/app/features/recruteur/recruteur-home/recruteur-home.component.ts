// src/app/features/recruteur/recruteur-home/recruteur-home.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Import statique de jwt-decode :

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-recruteur-home',
  templateUrl: './recruteur-home.component.html'
})
export class RecruteurHomeComponent {
  userEmail: string | null = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // On récupère le token depuis le service
    const token = this.authService.getToken();
    if (token) {
      // Avec jwt_decode importé statiquement, on peut directement décoder :
      try {
        // On force le typing en "any" pour accéder à la propriété "sub"
        const payload: any = jwt_decode(token);
        this.userEmail = payload.sub;
      } catch (e) {
        console.error('Erreur lors du décodage du JWT :', e);
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

