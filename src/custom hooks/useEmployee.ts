import { useState } from "react";
import Employee from "../entities/employee";

const useEmployee = () => {
  const [employee, setEmployee] = useState<Employee>({
    id: null,
    nom: "",
    prenom: "",
    age: null,
    departement: "",
    salaire: null,
    cin: null,
    cnss: null,
    adresse: "",
    etatSocial: "",
    matricule: null,
    email: "",
    numeroTelephone: null,
    sexe:"",
    company: {
      name: "",
    },
    competences: [],
    role:{
      id: null,
      nom:"",
    },
    login:{
      username:"",
      password:"",
      employee_id:null,
    },
    job:""
  });
  
  

  return [employee, setEmployee] as const;
};

export default useEmployee;
