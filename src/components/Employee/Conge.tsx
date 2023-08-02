/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect, useContext } from "react";
import axios, { AxiosError } from "axios";
import AuthContext from "../Authentification/AuthProvider";
import Conge from "../../entities/conge";

const Conges = () => {
  const [conges, setConges] = useState<Conge[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newConge, setNewConge] = useState({
    dateDebut: "",
    dateFin: "",
    statut: "",
  });

  const authContext = useContext(AuthContext);
  let employeeId: string | undefined;

  if (authContext) {
    const { auth } = authContext;
    if (auth) {
      employeeId = auth.employeeId;
    }
  }

  useEffect(() => {
    if (employeeId) {
      fetchCongeById();
    }
  }, [employeeId]);

  const fetchCongeById = () => {
    if (employeeId) {
      axios
        .get<Conge[]>(`http://localhost:8080/api/conge/${employeeId}`)
        .then((response) => setConges(response.data))
        .catch((error: AxiosError) => setError(error.message));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewConge((prevConge) => ({ ...prevConge, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dateDebut = new Date(newConge.dateDebut);
    const dateFin = new Date(newConge.dateFin);
    if (dateFin <= dateDebut) {
      setError("La date de fin doit être après la date de début");
      return;
    }
    const maxEndDate = new Date(dateDebut);
    maxEndDate.setMonth(dateDebut.getMonth() + 1);

    if (dateFin > maxEndDate) {
      setError(
        "La date de fin peut être au maximum un mois après la date de début"
      );
      return;
    }

    setError("");
    try {
      await axios.post(
        `http://localhost:8080/api/conge/${employeeId ?? ""}`,
        newConge
      );
      fetchCongeById();
      setNewConge({
        dateDebut: "",
        dateFin: "",
        statut: "",
      });
    } catch (error) {
      console.error("Error creating conge:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="mt-4">Demande Congé</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Date Début:</label>
              <input
                type="date"
                className="form-control"
                name="dateDebut"
                value={newConge.dateDebut}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col">
              <label className="form-label">Date Fin:</label>
              <input
                type="date"
                className="form-control"
                name="dateFin"
                value={newConge.dateFin}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Créer congé
          </button>
        </form>
        <h3 className="mt-4">Liste des Congés</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date Debut</th>
              <th>Date Fin</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {conges.map((conge) => (
              <tr key={conge.id}>
                <td>{conge.dateDebut}</td>
                <td>{conge.dateFin}</td>
                {conge.statut === "En attente" ? (
                  <td style={{ color: "orange" }}>{conge.statut}</td>
                ) : conge.statut === "Accepté" ? (
                  <td style={{ color: "green" }}>{conge.statut}</td>
                ) : (
                  <td style={{ color: "red" }}>{conge.statut}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Conges;
