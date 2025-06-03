export interface Candidature {
  id: number;
  datePostulation: Date;
  statut: string;
  offre: {
    id: number;
    titre: string;
    entreprise: string;
    lieu: string;
    salaire?: number;
    description: string;
  };
  candidat: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
  };
}
