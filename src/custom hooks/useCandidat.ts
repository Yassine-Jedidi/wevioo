import { useState } from "react";
import Candidat from "../entities/candidat";

const useCandidat = () => {
  const [candidat, setCandidat] = useState<Candidat>({
    id: null,
    nom: "",
    prenom: "",
    age: null,
    sexe:"",
    adresse: "",
    email: "",
    numTelephone: null,
    competences: [],
  });
  
  

  return [candidat, setCandidat] as const;
};

export default useCandidat;
