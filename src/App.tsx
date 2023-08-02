import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import AjouterEmployee from "./components/Employee/AjouterEmployee";
import ModifierEmployee from "./components/Employee/ModifierEmployee";
import DetailsEmployee from "./components/Employee/DetailsEmployee";
import RechercheEmployee from "./components/Employee/RechercheEmployee";
import ConsulterCvs from "./components/Candidat/ConsulterCvs";
import AjouterCandidat from "./components/Candidat/AjouterCandidat";
import DetailsCandidat from "./components/Candidat/DetailsCandidat";
import Login from "./components/Login/Login";
import Footer from "./components/Footer";
import "./Footer.css";
import Conges from "./components/Employee/Conge";
import { AuthProvider } from "./components/Authentification/AuthProvider";
import HandleConges from "./components/Admin/HandleConges";
import ProtectedRoute from "./components/Authentification/ProtectedRoute";
import Logout from "./components/Logout/Logout";
import Profile from "./components/Employee/Profile";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import ListeEmployes from "./components/Employee/ListeEmployes";
function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <SideBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/listeEmployes"
            element={
              <ProtectedRoute requiredRole="Admin">
                <ListeEmployes />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/conges" element={<Conges />} />
          <Route
            path="/handleConges"
            element={
              <ProtectedRoute requiredRole="Admin">
                <HandleConges />
              </ProtectedRoute>
            }
          />
          <Route path="/ajouterEmployee" element={<AjouterEmployee />} />
          <Route path="/modifierEmployee/:id" element={<ModifierEmployee />} />
          <Route path="/detailsEmployee/:id" element={<DetailsEmployee />} />
          <Route path="/rechercheEmployee/" element={<RechercheEmployee />} />
          <Route path="/consulterCandidats/" element={<ConsulterCvs />} />
          <Route path="/ajouterCandidat/" element={<AjouterCandidat />} />
          <Route path="/detailsCandidat/:id" element={<DetailsCandidat />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
