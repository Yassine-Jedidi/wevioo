import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import useEmployee from "../../custom hooks/useEmployee";
import Employee from "../../entities/employee";
import Competence from "../../entities/competence";
import Role from "../../entities/role";

const ModifierEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [employee, setEmployee] = useEmployee();

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "company") {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        company: { name: value },
      }));
    } else if (name === "competences") {
      if (e.target instanceof HTMLSelectElement) {
        const selectedOptions = Array.from(e.target.options);
        const selectedCompetences = selectedOptions
          .filter((option) => option.selected)
          .map((option) => ({
            id: parseInt(option.value),
            nom: option.text,
          }));
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          competences: selectedCompetences,
        }));
      }
    } else if (name === "roles") {
      const selectedRole = roles.find((role) => role.nom === value);
      if (selectedRole != undefined) {
        setEmployee((prevEmployee) => ({
          ...prevEmployee,
          role: selectedRole,
        }));
      }
    } else {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value,
      }));
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id)
      axios
        .put(`http://localhost:8080/api/employee/${id}`, employee)
        .then(() => navigate("/listeEmployes"))
        .catch((error: Error) => setError(error.message));
  };

  // Fetch employee data
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      axios
        .get<Employee>(`http://localhost:8080/api/employee/${id}`)
        .then((res) => setEmployee(res.data))
        .catch((error: AxiosError) => {
          if (error.response && error.response.status === 404) {
            setError("Employee not found");
          } else {
            setError("An error occurred while fetching employee data");
          }
        });
    }
  }, [id, setEmployee]);

  // Fetch competence list
  const [competencesList, setCompetencesList] = useState<Competence[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  useEffect(() => {
    fetchCompetences();
    fetchRoles();
  }, [id]);

  const fetchCompetences = () => {
    axios
      .get<Competence[]>("http://localhost:8080/api/competences")
      .then((res) => setCompetencesList(res.data))
      .catch((error: Error) => setError(error.message));
  };
  const fetchRoles = () => {
    axios
      .get<Role[]>("http://localhost:8080/api/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  };
  if (error) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">An Error Occurred</h2>
            <p className="text-danger">{error}</p>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => navigate("/listeEmployes")}
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Modifier employé</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
                Nom
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Entrer le nom"
                name="nom"
                id="nom"
                value={employee.nom}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="prenom" className="form-label">
                Prénom
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Entrer le prénom"
                name="prenom"
                id="prenom"
                value={employee.prenom}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Entrer l'age"
                name="age"
                id="age"
                value={employee.age || ""}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="job" className="form-label">
                Emploi
              </label>
              <select
                className="form-control"
                name="job"
                id="job"
                value={employee.job}
                onChange={onInputChange}
              >
                <option value="">Sélectionner l'emploi</option>
                <option value="Développeur Backend">Développeur Backend</option>
                <option value="Développeur Frontend">
                  Développeur Frontend
                </option>
                <option value="Développeur Fullstack">
                  Développeur Fullstack
                </option>
                <option value="Ressources Humaines">Ressources Humaines</option>
                <option value="Comptable">Comptable</option>
                <option value="Spécialiste Marketing">
                  Spécialiste Marketing
                </option>
                <option value="Designer Graphique">Designer Graphique</option>
                <option value="Chef de Projet">Chef de Projet</option>
                <option value="Représentant Commercial">
                  Représentant Commercial
                </option>
                <option value="Analyste de Données">Analyste de Données</option>
                <option value="Responsable des Ressources Humaines">
                  Responsable des Ressources Humaines
                </option>
                <option value="Responsable Informatique">
                  Responsable Informatique
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="salaire" className="form-label">
                Salaire
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Entrer le salaire"
                name="salaire"
                id="salaire"
                value={employee.salaire || ""}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sexe" className="form-label">
                Sexe
              </label>
              <select
                className="form-control"
                name="sexe"
                id="sexe"
                value={employee.sexe}
                onChange={onInputChange}
              >
                <option value="">Sélectionner le sexe</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="departement" className="form-label">
                Département
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Entrer le département"
                name="departement"
                id="departement"
                value={employee.departement}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cin" className="form-label">
                CIN:
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Entrer le CIN"
                name="cin"
                id="cin"
                value={employee.cin || ""}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cnss" className="form-label">
                CNSS:
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Entrer le CNSS"
                name="cnss"
                id="cnss"
                value={employee.cnss || ""}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="adresse" className="form-label">
                Adresse:
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Entrer l'adresse"
                name="adresse"
                id="adresse"
                value={employee.adresse}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="etatSocial" className="form-label">
                Etat Social
              </label>
              <select
                className="form-control"
                name="etatSocial"
                id="etatSocial"
                value={employee.etatSocial}
                onChange={onInputChange}
              >
                <option value="">Sélectionner l'état social</option>
                <option value="Célibataire">Célibataire</option>
                <option value="Marié(e)">Marié(e)</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="matricule" className="form-label">
                Matricule:
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Entrer l'état social"
                name="matricule"
                id="matricule"
                value={employee.matricule || ""}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Entrer l'état social"
                name="email"
                id="email"
                value={employee.email}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numeroTelephone" className="form-label">
                Numero de téléphone:
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Entrer le numero de téléphone"
                name="numeroTelephone"
                id="numeroTelephone"
                value={employee.numeroTelephone || ""}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roles" className="form-label">
                Role
              </label>
              <select
                className="form-control"
                name="roles"
                id="roles"
                value={employee.role.nom}
                onChange={onInputChange}
              >
                <option value="">Sélectionner un rôle</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.nom}>
                    {role.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="competences" className="form-label">
                Compétences:
              </label>
              <select
                multiple
                className="form-control"
                name="competences"
                id="competences"
                value={employee.competences.map((comp) => comp.id.toString())}
                onChange={onInputChange}
              >
                {competencesList.map((competence) => (
                  <option key={competence.id} value={competence.id.toString()}>
                    {competence.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success mx-2">
                Modifier
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => navigate("/listeEmployes")}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifierEmployee;
