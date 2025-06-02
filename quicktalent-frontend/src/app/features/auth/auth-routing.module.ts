// src/app/features/auth/auth-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterCandidatComponent } from './register-candidat/register-candidat.component';
import { RegisterRecruteurComponent } from './register-recruteur/register-recruteur.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register-candidat', component: RegisterCandidatComponent },
  { path: 'register-recruteur', component: RegisterRecruteurComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
