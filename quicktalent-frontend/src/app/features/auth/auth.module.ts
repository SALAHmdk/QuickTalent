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

  ],
  imports: [
    LoginComponent,
    RegisterRecruteurComponent,
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    RegisterCandidatComponent
  ]
})
export class AuthModule { }
