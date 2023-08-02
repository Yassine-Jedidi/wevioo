import { useContext, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import LandingPage from "../../assets/LandingPage.jpg";
import AboutUs from "../../assets/AboutUs.png";
import "./Landing.css";
import { Link } from "react-router-dom";
import AuthContext from "../Authentification/AuthProvider";

function Landing() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext) {
      const { setAuth } = authContext;
      const logout = () => {
        const newAuth = {
          username: "",
          password: "",
          role: "",
          employeeId: "",
          seenModal: false,
          gender: "",
        };
        setAuth(newAuth);
      };

      logout();
    }
  }, [authContext]);

  return (
    <div className="landing-page">
      <MDBContainer fluid className="landing-page-container p-0">
        <MDBContainer>
          <MDBRow className="align-items-center vh-100">
            <MDBCol md="6" className="text-center text-md-start">
              <h1 className="mb-4">Bienvenue dans Wevioo</h1>
              <p className="mb-4">
                Découvrez les meilleurs services et solutions
              </p>
              <Link
                type="button"
                className="btn btn-info"
                to={{
                  pathname: "/login",
                }}
              >
                Commencer
              </Link>
            </MDBCol>
            <MDBCol md="6">
              <img
                src={LandingPage}
                alt="Page d'accueil"
                className="img-fluid rounded"
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <MDBContainer className="py-5 my-5">
          <MDBRow>
            <MDBCol md="4">
              <div className="text-center">
                <i className="fas fa-rocket fa-3x mb-3"></i>
                <h3 className="mb-3">Rapide et Efficace</h3>
                <p>
                  Notre plateforme est conçue pour fournir des solutions rapides
                  et efficaces pour répondre à vos besoins.
                </p>
              </div>
            </MDBCol>
            <MDBCol md="4">
              <div className="text-center">
                <i className="fas fa-cog fa-3x mb-3"></i>
                <h3 className="mb-3">Personnalisable</h3>
                <p>
                  Adaptez nos services à vos exigences grâce à nos options
                  personnalisables.
                </p>
              </div>
            </MDBCol>
            <MDBCol md="4">
              <div className="text-center">
                <i className="fas fa-lock fa-3x mb-3"></i>
                <h3 className="mb-3">Sécurisé</h3>
                <p>
                  Soyez assuré que vos données et informations sont en sécurité
                  avec nos mesures de sécurité avancées.
                </p>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <MDBContainer className="py-5 my-5">
          <MDBRow className="align-items-center">
            <MDBCol md="6" className="order-md-2">
              <img
                src={AboutUs}
                alt="À propos de nous"
                className="img-fluid rounded"
              />
            </MDBCol>
            <MDBCol md="6" className="text-center text-md-start">
              <h2 className="mb-4">À propos de nous</h2>
              <p className="mb-4">
                Depuis sa création, le groupe Wevioo accompagne ses clients dans
                leurs projets de transformation digitale en leur apportant son
                expertise et son savoir-faire à travers son offre de services
                dans le Consulting, le Digital et l’Innovation. En tant que
                partenaire engagé, Wevioo fournit à ses clients des solutions
                d’innovation digitale parfaitement adaptées à leurs enjeux
                d’agilité, de performance et de développement.
              </p>
              <p className="mb-4">
                Le Groupe Wevioo a développé depuis plus de 22 ans une forte
                présence à l'international et opère principalement dans les
                secteurs de la Supply Chain, de l'Industrie, de la Finance et du
                Secteur Public. Fort de plusieurs centaines de réalisations dans
                des contextes exigeants, Wevioo a mené avec ses experts métier
                et techniques des projets dans plus de 30 pays en Europe, en
                Amérique du Nord, en Afrique et au Moyen-Orient.
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </div>
  );
}

export default Landing;
