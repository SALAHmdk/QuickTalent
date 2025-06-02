// src/app/features/recruteur/recruteur.module.ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RecruteurRoutingModule } from './recruteur-routing.module';

import { CandidaturesParOffreComponent } from './candidatures-par-offre/candidatures-par-offre.component';
import { CreateOffreComponent } from './create-offre/create-offre.component';
import { MyOffresComponent } from './my-offres/my-offres.component';
import { ProfileRecruteurComponent } from './profile/profile-recruteur.component';
import { RecruteurHomeComponent } from './recruteur-home/recruteur-home.component';

@NgModule({
  declarations: [

  ],
  imports: [
    RecruteurHomeComponent,
    ProfileRecruteurComponent,
    MyOffresComponent,
    CreateOffreComponent,
    CandidaturesParOffreComponent,
    CommonModule,
    FormsModule,
    RecruteurRoutingModule
  ]
})
export class RecruteurModule { }
