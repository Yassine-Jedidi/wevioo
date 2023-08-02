import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { MDBIcon } from "mdb-react-ui-kit"; // Import the MDBIcon from the package
import AuthContext from "./Authentification/AuthProvider";

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSideBarChange = () => {
    setIsOpen(!isOpen);
  };
  const authContext = useContext(AuthContext);
  const role = authContext?.auth?.role || ""; // Set a default value if authContext or auth is not available
  const employeeId = authContext?.auth?.employeeId || ""; // Set a default value if authContext or auth is not available
  const isAdmin = role === "Admin";
  if (employeeId) {
    return (
      <>
        <div className="wrapper">
          <input
            type="checkbox"
            id="btn"
            hidden
            checked={isOpen}
            onChange={handleSideBarChange}
          />
          <label htmlFor="btn" className="menu-btn">
            <MDBIcon icon="bars" className="menu-icon" /> {/* Updated Icon */}
            <MDBIcon icon="times" className="close-icon" /> {/* Updated Icon */}
          </label>
          <nav id="sidebar">
            <div className="title">Side Menu</div>
            <ul className="list-items">
              <li>
                <Link to="/home" onClick={handleLinkClick}>
                  <MDBIcon icon="home" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={handleLinkClick}>
                  <MDBIcon icon="user" />
                  Profile
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/listeEmployes" onClick={handleLinkClick}>
                    <MDBIcon icon="users" />
                    Liste des Employés
                  </Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link to="/ajouterEmployee" onClick={handleLinkClick}>
                    <MDBIcon icon="user-plus" />
                    Ajouter Employé
                  </Link>
                </li>
              )}

              {isAdmin && (
                <li>
                  <Link to="/rechercheEmployee/" onClick={handleLinkClick}>
                    <MDBIcon icon="search" />
                    Recherche Employé
                  </Link>
                </li>
              )}
              <li>
                <Link to="/ajouterCandidat" onClick={handleLinkClick}>
                  <MDBIcon icon="user-plus" />
                  Ajouter Candidat
                </Link>
              </li>
              <li>
                <Link to="/consulterCandidats" onClick={handleLinkClick}>
                  <MDBIcon icon="users" />
                  Consulter Candidats
                </Link>
              </li>
              <li>
                <Link to="/conges" onClick={handleLinkClick}>
                  <MDBIcon icon="suitcase" />
                  Demande de Congé
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/handleConges" onClick={handleLinkClick}>
                    <MDBIcon icon="tasks" />
                    Voir les Congés
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/logout"
                  onClick={handleLinkClick}
                  style={{ color: "#ff5a5a" }}
                >
                  <MDBIcon icon="sign-out-alt" />
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
};

export default SideBar;
