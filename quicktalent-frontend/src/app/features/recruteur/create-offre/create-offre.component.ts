// src/app/features/recruteur/create-offre/create-offre.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offre } from '../../../../app/core/models/offre.model';
import { RecruteurService } from '../../../../app/core/services/recruteur.service';

@Component({
  selector: 'app-create-offre',
  templateUrl: './create-offre.component.html'
})
export class CreateOffreComponent {

  offre: Offre = {
    titre: '',
    ville: '',
    description: ''
  };
  loading = false;

  constructor(
    private recruteurService: RecruteurService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit() {
    this.loading = true;
    this.recruteurService.createOffre(this.offre).subscribe({
      next: res => {
        this.toastr.success('Offre créée', 'Succès');
        this.router.navigate(['/recruteur/my-offres']);
      },
      error: err => {
        this.loading = false;
        this.toastr.error('Erreur lors de la création', 'Erreur');
      }
    });
  }
}
