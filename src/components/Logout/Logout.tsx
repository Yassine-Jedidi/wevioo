import { useContext, useEffect } from "react";
import AuthContext from "../Authentification/AuthProvider";
import { Navigate } from "react-router-dom";

const Logout = () => {
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

  return <Navigate to="/login"></Navigate>;
};

export default Logout;
