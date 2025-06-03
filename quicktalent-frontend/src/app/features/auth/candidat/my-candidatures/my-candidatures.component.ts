import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Candidature } from '../../../../core/models/candidature.model';
import { CandidatureService } from '../../../../core/services/candidature.service';

@Component({
  selector: 'app-my-candidatures',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-candidatures.component.html',
  styleUrls: ['./my-candidatures.component.css']
})
export class MyCandidaturesComponent implements OnInit {
  candidatures: Candidature[] = [];
  loading = false;

  constructor(private candidatureService: CandidatureService) {}

  ngOnInit(): void {
    this.loadCandidatures();
  }

  loadCandidatures(): void {
    this.loading = true;

    // Correction: Vérifiez que getMesCandidatures() retourne bien un Observable
    this.candidatureService.getMesCandidatures().subscribe({
      next: (data: Candidature[]) => {
        this.candidatures = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des candidatures:', error);
        this.loading = false;
      }
    });
  }

  // Méthode pour retirer une candidature
  retirerCandidature(candidatureId: number): void {
    if (confirm('Êtes-vous sûr de vouloir retirer cette candidature ?')) {
      this.candidatureService.retirerCandidature(candidatureId).subscribe({
        next: () => {
          this.candidatures = this.candidatures.filter(c => c.id !== candidatureId);
          console.log('Candidature retirée avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }
}
