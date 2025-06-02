// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  // Redirection par défaut
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  // Routes “/auth” (login, register)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  // Routes “/candidat” (protégées)
  {
    path: 'candidat',
    loadChildren: () => import('./features/candidat/candidat.module').then(m => m.CandidatModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_CANDIDAT' }
  },

  // Routes “/recruteur” (protégées)
  {
    path: 'recruteur',
    loadChildren: () => import('./features/recruteur/recruteur.module').then(m => m.RecruteurModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_RECRUTEUR' }
  },

  // Page 404 / wildcard
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
