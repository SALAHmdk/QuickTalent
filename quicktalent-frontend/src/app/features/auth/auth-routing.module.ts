// src/app/features/recruteur/recruteur-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CandidaturesParOffreComponent } from '../recruteur/candidatures-par-offre/candidatures-par-offre.component';
import { CreateOffreComponent } from '../recruteur/create-offre/create-offre.component';
import { MyOffresComponent } from '../recruteur/my-offres/my-offres.component';
import { ProfileRecruteurComponent } from '../recruteur/profile/profile-recruteur.component';
import { RecruteurHomeComponent } from '../recruteur/recruteur-home/recruteur-home.component';

const routes: Routes = [
  {
    path: 'home',
    component: RecruteurHomeComponent
  },
  {
    path: 'mes-offres',
    component: MyOffresComponent
  },
  {
    path: 'mes-offres/nouvelle',
    component: CreateOffreComponent
  },
  {
    path: 'candidatures/:offreId',
    component: CandidaturesParOffreComponent
  },
  {
    path: 'profile',
    component: ProfileRecruteurComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruteurRoutingModule { }
