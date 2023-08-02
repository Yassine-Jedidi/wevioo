interface Conge {
    id: number;
    employee: {
      prenom: string;
      nom: string;
    };
    dateDebut: string;
    dateFin: string;
    statut: string;
  }
  export default Conge;