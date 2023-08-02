import { useContext, useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import AuthContext from "../Authentification/AuthProvider";
import { Button, Modal } from "react-bootstrap";

function Home() {
  const authContext = useContext(AuthContext);
  let role = "";
  let username = "";
  let gender = "";

  if (authContext) {
    const { auth } = authContext;
    if (auth) {
      role = auth.role;
      username = auth.username;
      gender = auth.gender;
    }
  }

  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  // Function to show the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Function to hide the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Show the modal when the component mounts
  useEffect(() => {
    handleShowModal();
  }, []);

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bonjour, {username}</p>
          <p>
            Vous êtes connecté{gender === "Femme" ? "e" : ""} en tant qu'
            {role.toLowerCase()}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <MDBContainer className="py-5">
        <MDBRow className="mb-5">
          {role === "Admin" && (
            <>
              <MDBCol md="6">
                <MDBCard className="h-100 d-flex" style={cardStyle}>
                  <MDBCardBody>
                    <h5 className="card-title">Ajouter un Employé</h5>
                    <p className="card-text">
                      Ajouter un nouvel employé à la base de données.
                    </p>
                    <MDBBtn color="primary" href="/ajouterEmployee">
                      Ajouter
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="h-100 d-flex" style={cardStyle}>
                  <MDBCardBody>
                    <h5 className="card-title">Modifier un Employé</h5>
                    <p className="card-text">
                      Modifier les informations d'un employé existant.
                    </p>
                    <MDBBtn color="primary" href="/listeEmployes">
                      Modifier
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </>
          )}
        </MDBRow>

        <MDBRow className="mb-5">
          {role === "Admin" && (
            <>
              <MDBCol md="6">
                <MDBCard className="h-100 d-flex" style={cardStyle}>
                  <MDBCardBody>
                    <h5 className="card-title">Voir les demandes de congés</h5>
                    <p className="card-text">Faire une demande de congé.</p>
                    <MDBBtn color="primary" href="/handleConges">
                      Voir
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="h-100 d-flex" style={cardStyle}>
                  <MDBCardBody>
                    <h5 className="card-title">Recherche d'un Employé</h5>
                    <p className="card-text">
                      Recherche d'un employé spécifique.
                    </p>
                    <MDBBtn color="primary" href="/rechercheEmployee">
                      Rechercher
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </>
          )}
        </MDBRow>

        {/* ... (other cards) ... */}

        <MDBRow className="mb-4">
          <MDBCol md="6">
            <MDBCard className="h-100 d-flex" style={cardStyle}>
              <MDBCardBody>
                <h5 className="card-title">Ajouter un Candidat</h5>
                <p className="card-text">
                  Ajouter un nouveau candidat à la base de données.
                </p>
                <MDBBtn color="primary" href="/ajouterCandidat">
                  Ajouter
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6">
            <MDBCard className="h-100 d-flex" style={cardStyle}>
              <MDBCardBody>
                <h5 className="card-title">Consulter les Candidats</h5>
                <p className="card-text">Consulter la liste des candidats.</p>
                <MDBBtn color="primary" href="/consulterCandidats">
                  Consulter
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow className="mb-4">
          <MDBCol md="6">
            <MDBCard className="h-100 d-flex" style={cardStyle}>
              <MDBCardBody>
                <h5 className="card-title">Demande de Congé</h5>
                <p className="card-text">Faire une demande de congé.</p>
                <MDBBtn color="primary" href="/conges">
                  Demande
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6">
            <MDBCard className="h-100 d-flex" style={cardStyle}>
              <MDBCardBody>
                <h5 className="card-title">Voir Profil</h5>
                <p className="card-text">Voir mon profil utilisateur.</p>
                <MDBBtn color="primary" href="/profile">
                  Voir
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* Add more functionality cards as needed */}
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard className="h-100 d-flex" style={cardStyle}>
              <MDBCardBody>
                <h5 className="card-title">Déconnexion</h5>
                <p className="card-text">Se déconnecter de l'application.</p>
                <MDBBtn color="danger" href="/logout">
                  Déconnexion
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

// Inline style for the cards
const cardStyle = {
  border: "none",
  backgroundColor: "#f8f9fa",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
  marginBottom: "20px",
};

export default Home;
