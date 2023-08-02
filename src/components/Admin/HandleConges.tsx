import { useState, useEffect } from "react";
import axios from "axios";
import Conge from "../../entities/conge";

const Conges = () => {
  const [conges, setConges] = useState<Conge[]>([]);

  // Fetch the list of conges when the component mounts
  useEffect(() => {
    fetchConges();
  }, []);

  const fetchConges = () => {
    axios
      .get<Conge[]>("http://localhost:8080/api/conge")
      .then((res) => setConges(res.data))
      .catch((error: Error) => error.message);
  };

  const handleStatusChange = (congeId: number, newStatus: string) => {
    axios
      .put<Conge>(`http://localhost:8080/api/conge/${congeId}`, {
        statut: newStatus,
      })
      .then(() => fetchConges())
      .catch((error: Error) => error.message);
  };

  return (
    <>
      <div className="container">
        <h2 className="mt-4">Les demandes des Congés</h2>
        <h3 className="mt-4">List des Congés</h3>
        <ul className="list-group">
          {conges.map((conge) => (
            <li key={conge.id} className="list-group-item">
              Employee Name : {conge.employee.prenom} {conge.employee.prenom},
              Date Debut: {conge.dateDebut}, Date Fin: {conge.dateFin}, Statut:{" "}
              {conge.statut}
              <div>
                {/* Admin buttons to accept or refuse the congé */}
                {conge.statut === "En attente" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(conge.id, "Accepté")}
                      className="btn btn-success mx-2"
                    >
                      Accepter
                    </button>
                    <button
                      onClick={() => handleStatusChange(conge.id, "Refusé")}
                      className="btn btn-danger"
                    >
                      Refuser
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Conges;
