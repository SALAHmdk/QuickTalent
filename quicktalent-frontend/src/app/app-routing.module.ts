// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './core/guards/role.guard'; // si vous l’avez implémenté

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'candidat',
    canActivate: [RoleGuard],           // si vous verrouillez par rôle
    data: { roles: ['ROLE_CANDIDAT'] },
    loadChildren: () => import('./features/auth/candidat/candidat.module')
      .then(m => m.CandidatModule)
  },
  {
    path: 'recruteur',
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_RECRUTEUR'] },
    loadChildren: () => import('./features/recruteur/recruteur.module')
      .then(m => m.RecruteurModule)
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
