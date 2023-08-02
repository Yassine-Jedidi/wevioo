import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEmployee from "../../custom hooks/useEmployee";
import Employee from "../../entities/employee";

const DetailsEmployee = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [error, setError] = useState<string>("");

  const [employee, setEmployee] = useEmployee();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id)
      axios
        .get<Employee>(`http://localhost:8080/api/employee/${id}`)
        .then((res) => setEmployee(res.data))
        .catch((error: Error) => setError(error.message));
  }, [id, setEmployee]);
  return (
    <div className="container">
      {error && <p>{error}</p>}
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Détails de l'employé</h2>
          <div className="mb-3">
            <label htmlFor="nom" className="form-label fw-bold">
              Nom:
            </label>
            <label className="mx-1">{employee.nom}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="prenom" className="form-label fw-bold">
              Prénom:
            </label>
            <label className="mx-1">{employee.prenom}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label fw-bold">
              Role:
            </label>
            <label className="mx-1">{employee.role.nom}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label fw-bold">
              Emploi:
            </label>
            <label className="mx-1">{employee.job}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label fw-bold">
              Age:
            </label>
            <label className="mx-1">{employee.age}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label fw-bold">
              Sexe:
            </label>
            <label className="mx-1">{employee.sexe}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="salaire" className="form-label fw-bold">
              Salaire:
            </label>
            <label className="mx-1">{employee.salaire}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="departement" className="form-label fw-bold">
              Département:
            </label>
            <label className="mx-1">{employee.departement}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="departement" className="form-label fw-bold">
              CIN:
            </label>
            <label className="mx-1">{employee.cin}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="departement" className="form-label fw-bold">
              CNSS:
            </label>
            <label className="mx-1">{employee.cnss}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="departement" className="form-label fw-bold">
              Adresse:
            </label>
            <label className="mx-1">{employee.adresse}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="departement" className="form-label fw-bold">
              Etat Social:
            </label>
            <label className="mx-1">{employee.etatSocial}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="departement" className="form-label fw-bold">
              Email:
            </label>
            <label className="mx-1">{employee.email}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="departement" className="form-label fw-bold">
              Numero de téléphone:
            </label>
            <label className="mx-1">{employee.numeroTelephone}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="departement" className="form-label fw-bold">
              Matricule:
            </label>
            <label className="mx-1">{employee.matricule}</label>
          </div>
          <div>
            <label htmlFor="departement" className="form-label fw-bold">
              Compétences:
            </label>
          </div>
          <div>
            <label className="mx-1">
              <ul>
                {employee.competences.map((competence) => (
                  <li key={competence.id}>{competence.nom}</li>
                ))}
              </ul>
            </label>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button
              type="button"
              className="btn btn-danger me-3"
              onClick={() => navigate("/listeEmployes")}
            >
              Retour
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(`/modifierEmployee/${id ?? ""}`)}
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsEmployee;
