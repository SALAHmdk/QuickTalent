// src/app/features/auth/candidat/candidat.module.ts

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CandidatRoutingModule } from './candidat-routing.module';

// Vous n'appelez **pas** declarations: []
// Vous importez les composants autonomes
import { CandidatHomeComponent } from './candidat-home/candidat-home.component';
import { MyCandidaturesComponent } from './my-candidatures/my-candidatures.component';
import { OffreDetailComponent } from './offre-detail/offre-detail.component';
import { OffresListComponent } from './offres-list/offres-list.component';
import { ProfileCandidatComponent } from './profile/profile-candidat.component';

@NgModule({
  // On retire entièrement la clé "declarations"
  imports: [
    CommonModule,
    FormsModule,
    CandidatRoutingModule,

    // Comme les composants sont standalone, on les ajoute directement dans imports
    CandidatHomeComponent,
    ProfileCandidatComponent,
    OffresListComponent,
    OffreDetailComponent,
    MyCandidaturesComponent
  ]
})
export class CandidatModule { }
