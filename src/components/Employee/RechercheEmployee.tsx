import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Employee from "../../entities/employee";

const RechercheEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    axios
      .get<Employee[]>("http://localhost:8080/api/employee")
      .then((res) => setEmployees(res.data))
      .catch((error: AxiosError) => setError(error.message));
  };

  const deleteEmployee = (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet employé ?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8080/api/employee/${id}`)
        .then(() => loadEmployees())
        .catch((error: AxiosError) => setError(error.message));
    }
  };
  const navigate = useNavigate();
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
        Recherche des employés
      </h1>
      <form className="d-flex" role="search">
        <input
          className="form-control mx-auto p-2 my-1 text-center"
          style={{ width: "250px" }}
          type="search"
          placeholder="Recherche"
          aria-label="Recherche"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="mx-4 my-3 d-flex justify-content-center table-responsive-sm">
        <table className="table table-bordered table-striped shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Prénom</th>
              <th scope="col">Age</th>
              <th scope="col">Salaire</th>
              <th scope="col">Département</th>
              <th scope="col">Company</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.prenom.toLowerCase().includes(search) ||
                      item.nom.toLowerCase().includes(search);
              })
              .map((employee, index) => (
                <tr key={employee.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{employee.nom}</td>
                  <td>{employee.prenom}</td>
                  <td>{employee.age}</td>
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
                    <button
                      onClick={() =>
                        employee.id !== null && deleteEmployee(employee.id)
                      }
                      type="button"
                      className="btn btn-danger"
                    >
                      Supprimer
                    </button>
                    <Link
                      type="button"
                      className="btn btn-info"
                      to={{
                        pathname: `/detailsEmployee/${employee.id ?? ""}`,
                      }}
                    >
                      Détails
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RechercheEmployee;
