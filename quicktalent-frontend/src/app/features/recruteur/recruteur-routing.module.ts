// src/app/features/recruteur/recruteur-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CandidaturesParOffreComponent } from './candidatures-par-offre/candidatures-par-offre.component';
import { CreateOffreComponent } from './create-offre/create-offre.component';
import { MyOffresComponent } from './my-offres/my-offres.component';
import { ProfileRecruteurComponent } from './profile/profile-recruteur.component';
import { RecruteurHomeComponent } from './recruteur-home/recruteur-home.component';

const routes: Routes = [
  { path: 'home', component: RecruteurHomeComponent },
  { path: 'profile', component: ProfileRecruteurComponent },
  { path: 'my-offres', component: MyOffresComponent },
  { path: 'my-offres/create', component: CreateOffreComponent },
  { path: 'my-offres/:id/candidatures', component: CandidaturesParOffreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruteurRoutingModule { }
