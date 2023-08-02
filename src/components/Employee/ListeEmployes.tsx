import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Employee from "../../entities/employee";
import Select, { MultiValue } from "react-select";
import { useNavigate } from "react-router-dom";

type OptionType = {
  value: string; // Change this to match your option value type
  label: string;
};

const ListeEmployes = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  //Competences
  const [selectedCompetences, setSelectedCompetences] = useState<OptionType[]>(
    []
  );

  const competenceOptions: OptionType[] = employees.reduce(
    (options: OptionType[], employee: Employee) => {
      employee.competences.forEach((competence) => {
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

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    axios
      .get<Employee[]>("http://localhost:8080/api/employee")
      .then((res) => setEmployees(res.data))
      .catch((error: Error) => setError(error.message));
  };

  const deleteEmployee = (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet employé ?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8080/api/employee/${id}`)
        .then(() => loadEmployees())
        .catch((error: Error) => setError(error.message));
    }
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
                onClick={() => navigate("/home")}
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
    <>
      <h1 className="display-6 my-3 d-flex justify-content-center">
        Liste des employés
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
              <th scope="col">Sexe</th>
              <th scope="col">Salaire</th>
              <th scope="col">Département</th>
              <th scope="col">Company</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((item) => {
                const hasSelectedCompetences =
                  selectedCompetences.length === 0 ||
                  selectedCompetences.every((selected) =>
                    item.competences.some(
                      (competence) => competence.nom === selected.value
                    )
                  );

                return hasSelectedCompetences;
              })
              .map((employee, index) => (
                <tr key={employee.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{employee.nom}</td>
                  <td>{employee.prenom}</td>
                  <td>{employee.age}</td>
                  <td>{employee.sexe}</td>
                  <td>{employee.salaire}</td>
                  <td>{employee.departement}</td>
                  <td>{employee.company.name}</td>
                  <td className="d-flex gap-2">
                    <Link
                      type="button"
                      className="btn btn-warning"
                      to={{
                        pathname: `/modifierEmployee/${employee.id ?? ""}`,
                      }}
                    >
                      Modifier
                    </Link>
                    <Link
                      type="button"
                      className="btn btn-info"
                      to={{
                        pathname: `/detailsEmployee/${employee.id ?? ""}`,
                      }}
                    >
                      Détails
                    </Link>
                    <button
                      onClick={() =>
                        employee.id !== null && deleteEmployee(employee.id)
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

export default ListeEmployes;
