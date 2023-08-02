import React, { useState, useContext, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

import image from "../../assets/WeviooFull.jpg";
import logo from "../../assets/Wevioo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Authentification/AuthProvider";
import Employee from "../../entities/employee";
import LoginResponse from "../../entities/login";

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { setAuth } = authContext || {}; // Set an empty object as fallback

  useEffect(() => {
    if (setAuth) {
      const newAuth = {
        username: "",
        password: "",
        role: "",
        employeeId: "",
        seenModal: false,
        gender: "",
      };
      setAuth(newAuth);
    }
  }, [setAuth]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchRoleAndGender = (employeeId: number) => {
    return axios
      .get<Employee>(`http://localhost:8080/api/employee/${employeeId}`)
      .then((response) => {
        const role = response.data.role.nom;
        const gender = response.data.sexe;
        return { role, gender };
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  };

  const handleLogin = () => {
    const user = { username, password };
    axios
      .post<LoginResponse>("http://localhost:8080/api/login", user)
      .then((response) => {
        const employeeId = response.data.employeeId;
        if (response.data.userExists) {
          fetchRoleAndGender(employeeId)
            .then((result) => {
              if (result) {
                const { role, gender } = result; // Destructure role and gender from the result
                if (setAuth) {
                  setAuth({
                    username: user.username,
                    password: user.password,
                    role: role, // Assign role
                    employeeId: employeeId.toString(), // Convert employeeId to string
                    seenModal: true,
                    gender: gender, // Assign gender
                  });
                }
                navigate("/home");
              }
            })
            .catch((error: Error) => {
              console.log(error.message);
            });
        } else {
          setErrorMessage("Invalid username or password");
        }
      })
      .catch((error: Error) => console.log(error.message));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleLogin(); // Call the handleLogin function to handle the login logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-4">
              <MDBCol md="6">
                <div className="d-flex align-items-center w-100 h-100">
                  <MDBCardImage
                    src={image}
                    alt="login form"
                    className="rounded-start w-100 h-100"
                  />
                </div>
              </MDBCol>

              <MDBCol md="6">
                <MDBCardBody className="d-flex flex-column ">
                  <div className="d-flex flex-row mt-2 justify-content-center">
                    <span className="h1 fw-bold mb-0">
                      <img src={logo} alt="login form" />
                    </span>
                  </div>

                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Connectez-vous à votre compte
                  </h5>

                  {/* Afficher le message d'erreur*/}
                  {errorMessage && (
                    <div className="text-danger text-center mb-2">
                      {errorMessage}
                    </div>
                  )}

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Username"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-5"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    className="btn btn-dark mb-5 px-5 d-flex flex-row mt-2 justify-content-center"
                    type="submit"
                  >
                    Login
                  </button>

                  <div className="d-flex flex-row justify-content-center">
                    <a href="#!" className="small text-muted me-1">
                      Terms of use.
                    </a>
                    <a href="#!" className="small text-muted">
                      Privacy policy
                    </a>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </div>
    </form>
  );
};

export default Login;
