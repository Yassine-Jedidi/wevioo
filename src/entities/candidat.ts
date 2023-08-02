interface Candidat {
    id: number | null;
    nom: string;
    prenom: string;
    age: number | null;
    sexe:string;
    adresse: string;
    email: string;
    numTelephone: number | null;
    competences: {
      id: number;
      nom: string;
    }[];
  }
export default Candidat;
