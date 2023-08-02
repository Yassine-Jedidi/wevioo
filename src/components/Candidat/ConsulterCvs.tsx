import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Candidat from "../../entities/candidat";
import Select, { MultiValue } from "react-select";

type OptionType = {
  value: string; // Change this to match your option value type
  label: string;
};

const ConsulterCvs = () => {
  const [candidats, setCandidats] = useState<Candidat[]>([]);

  useEffect(() => {
    loadCandidats();
  }, []);

  const loadCandidats = () => {
    axios
      .get<Candidat[]>("http://localhost:8080/api/cv")
      .then((res) => setCandidats(res.data))
      .catch((error: Error) => error.message);
  };

  const deleteCandidat = (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce candidat ?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8080/api/cv/${id}`)
        .then(() => loadCandidats())
        .catch((error: Error) => error.message);
    }
  };

  const [selectedCompetences, setSelectedCompetences] = useState<OptionType[]>(
    []
  );

  const competenceOptions: OptionType[] = candidats.reduce(
    (options: OptionType[], candidat: Candidat) => {
      candidat.competences.forEach((competence) => {
        const option: OptionType = {
          value: competence.nom,
          label: competence.nom,
        };
        if (!options.some((o) => o.value === option.value)) {
          options.push(option);
        }
      });
      return options;
    },
    []
  );

  const handleCompetenceChange = (selectedOptions: MultiValue<OptionType>) => {
    const newSelectedCompetences = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
    }));
    setSelectedCompetences(newSelectedCompetences);
  };

  return (
    <>
      <h1 className="display-6 my-3 d-flex justify-content-center">
        Liste des candidats
      </h1>

      <div className="mx-4 my-3 d-flex justify-content-center">
        <Select
          isMulti
          value={selectedCompetences}
          options={competenceOptions}
          onChange={handleCompetenceChange}
          placeholder="Recherche par compétence"
        />
      </div>
      <div className="mx-4 my-3 d-flex justify-content-center table-responsive-sm">
        <table className="table table-bordered table-striped shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Prénom</th>
              <th scope="col">Age</th>
              <th scope="col">Adresse</th>
              <th scope="col">Numéro de téléphone</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidats
              .filter((candidat) => {
                return (
                  selectedCompetences.length === 0 ||
                  selectedCompetences.every((selected) =>
                    candidat.competences.some(
                      (competence) => competence.nom === selected.value
                    )
                  )
                );
              })
              .map((candidat, index) => (
                <tr key={candidat.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{candidat.nom}</td>
                  <td>{candidat.prenom}</td>
                  <td>{candidat.age}</td>
                  <td>{candidat.adresse}</td>
                  <td>{candidat.numTelephone}</td>
                  <td>{candidat.email}</td>

                  <td className="d-flex gap-2">
                    <Link
                      type="button"
                      className="btn btn-info"
                      to={{
                        pathname: `/detailsCandidat/${candidat.id ?? ""}`,
                      }}
                    >
                      Détails
                    </Link>
                    <button
                      onClick={() =>
                        candidat.id !== null && deleteCandidat(candidat.id)
                      }
                      type="button"
                      className="btn btn-danger"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ConsulterCvs;
