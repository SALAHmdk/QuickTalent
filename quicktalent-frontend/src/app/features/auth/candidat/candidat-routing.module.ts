// src/app/features/auth/candidat/candidat-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatHomeComponent } from './candidat-home/candidat-home.component';
import { MyCandidaturesComponent } from './my-candidatures/my-candidatures.component';
import { OffreDetailComponent } from './offre-detail/offre-detail.component';
import { OffresListComponent } from './offres-list/offres-list.component';
import { ProfileCandidatComponent } from './profile/profile-candidat.component';

const routes: Routes = [
  {
    path: 'home',
    component: CandidatHomeComponent
  },
  {
    path: 'offres',
    component: OffresListComponent
  },
  {
    path: 'offres/:id',
    component: OffreDetailComponent
  },
  {
    path: 'candidatures',
    component: MyCandidaturesComponent
  },
  {
    path: 'profile',
    component: ProfileCandidatComponent
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
export class CandidatRoutingModule { }
