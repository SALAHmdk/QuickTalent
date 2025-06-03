// src/app/features/auth/candidat/candidat.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CandidatRoutingModule } from './candidat-routing.module';

import { CandidatHomeComponent } from './candidat-home/candidat-home.component';
import { MyCandidaturesComponent } from './my-candidatures/my-candidatures.component';
import { OffreDetailComponent } from './offre-detail/offre-detail.component';
import { OffresListComponent } from './offres-list/offres-list.component';
import { ProfileCandidatComponent } from './profile/profile-candidat.component';

@NgModule({
  imports: [
    CommonModule,          // pour *ngIf, *ngFor, pipes date…
    FormsModule,           // pour [(ngModel)] si nécessaire
    CandidatRoutingModule,

    // On “importe” ici les composants standalone (plutôt que de les déclarer) :
    CandidatHomeComponent,
    MyCandidaturesComponent,
    OffreDetailComponent,
    OffresListComponent,
    ProfileCandidatComponent
  ]
})
export class CandidatModule { }
