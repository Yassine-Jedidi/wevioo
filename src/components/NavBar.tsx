import image from "../assets/Wevioo.png";
import { MDBNavbar } from "mdb-react-ui-kit";

const NavBar = () => {
  return (
    <>
      <MDBNavbar light style={{ backgroundColor: "#508eb7" }}>
        <div className="container-fluid d-flex justify-content-center">
          <a className="navbar-brand " href="/">
            <img src={image} alt="my image" loading="lazy" />
          </a>
        </div>
      </MDBNavbar>
    </>
  );
};

export default NavBar;
