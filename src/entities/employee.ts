interface Employee {
    id: number | null;
    nom: string;
    prenom: string;
    age: number | null;
    departement: string;
    salaire: number | null;
    cin: number | null;
    cnss: number | null;
    adresse: string;
    etatSocial: string;
    matricule: number | null;
    email: string;
    numeroTelephone: number | null;
    sexe:string;
    company: {
      name: string;
    };
    competences: {
      id: number;
      nom: string;
    }[];
    role:{
      id: number | null;
      nom:string;
    };
    login:{
      username:string;
      password:string;
      employee_id:number | null;
    }
    job:string;
  }
export default Employee;
