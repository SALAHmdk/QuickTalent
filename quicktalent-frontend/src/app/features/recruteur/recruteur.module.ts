// src/app/features/recruteur/recruteur.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecruteurRoutingModule } from './recruteur-routing.module';

import { CandidaturesParOffreComponent } from './candidatures-par-offre/candidatures-par-offre.component';
import { CreateOffreComponent } from './create-offre/create-offre.component';
import { MyOffresComponent } from './my-offres/my-offres.component';
import { ProfileRecruteurComponent } from './profile/profile-recruteur.component';
import { RecruteurHomeComponent } from './recruteur-home/recruteur-home.component';

@NgModule({
  // On enlève complètement “declarations”
  imports: [
    CommonModule,          // pour *ngIf, *ngFor, pipes date…
    FormsModule,           // pour [(ngModel)] si nécessaire
    RouterModule,          // pour routerLink, router-outlet, etc.
    RecruteurRoutingModule,

    // Comme ces composants sont standalone, on les MISE À JOUR dans “imports”:
    RecruteurHomeComponent,
    MyOffresComponent,
    CreateOffreComponent,
    CandidaturesParOffreComponent,
    ProfileRecruteurComponent
  ]
})
export class RecruteurModule { }
