import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCandidat from "../../custom hooks/useCandidat";
import Candidat from "../../entities/candidat";

const DetailsCandidat = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [candidat, setCandidat] = useCandidat();
  const [error, setError] = useState("");
  useEffect(() => {
    if (id) {
      // Check if id is defined before making the API request
      axios
        .get<Candidat>(`http://localhost:8080/api/cv/${id}`)
        .then((res) => setCandidat(res.data))
        .catch((error: Error) => setError(error.message));
    }
  }, [id, setCandidat]);

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
                onClick={() => navigate("/consulterCandidats")}
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
          <h2 className="text-center m-4">Détails du Candidat</h2>
          <div className="mb-3">
            <label htmlFor="nom" className="form-label fw-bold">
              Nom:
            </label>
            <label className="mx-1">{candidat.nom}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="prenom" className="form-label fw-bold">
              Prénom:
            </label>
            <label className="mx-1">{candidat.prenom}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="prenom" className="form-label fw-bold">
              Sexe:
            </label>
            <label className="mx-1">{candidat.sexe}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label fw-bold">
              Age:
            </label>
            <label className="mx-1">{candidat.age}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="departement" className="form-label fw-bold">
              Adresse:
            </label>
            <label className="mx-1">{candidat.adresse}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="departement" className="form-label fw-bold">
              Email:
            </label>
            <label className="mx-1">{candidat.email}</label>
          </div>
          <div className="mb-3">
            <label htmlFor="departement" className="form-label fw-bold">
              Numero de téléphone:
            </label>
            <label className="mx-1">{candidat.numTelephone}</label>
          </div>
          <div>
            <label htmlFor="departement" className="form-label fw-bold">
              Compétences:
            </label>
          </div>
          <div>
            <label className="mx-1">
              <ul>
                {candidat.competences.map((competence) => (
                  <li key={competence.id}>{competence.nom}</li>
                ))}
              </ul>
            </label>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate("/consulterCandidats")}
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCandidat;
