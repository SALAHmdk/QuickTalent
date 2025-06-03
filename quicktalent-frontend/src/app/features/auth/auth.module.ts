// src/app/features/auth/auth.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterCandidatComponent } from './register-candidat/register-candidat.component';
import { RegisterRecruteurComponent } from './register-recruteur/register-recruteur.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterCandidatComponent,
    RegisterRecruteurComponent
  ],
  imports: [
    CommonModule,        // *ngIf, *ngFor, pipes
    FormsModule,         // nécessaire pour [(ngModel)] dans register-candidat.component.html, login.component.html, etc.
    AuthRoutingModule    // routes « /auth/login », « /auth/register-candidat », « /auth/register-recruteur »
  ]
})
export class AuthModule { }
