import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthData {
  username: string;
  password: string;
  role: string;
  employeeId: string;
  seenModal: boolean;
  gender: string;
}

interface AuthContextProps {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData>(() => {
    // Try to retrieve the authentication data from localStorage
    const storedAuth = localStorage.getItem("auth");
    return storedAuth
      ? (JSON.parse(storedAuth) as AuthData)
      : {
          username: "",
          password: "",
          role: "",
          employeeId: "",
          seenModal: false,
          gender: "",
          // Initialize other properties with appropriate default values
        };
  });

  // When the 'auth' state changes, update the localStorage
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const authContextValue: AuthContextProps = {
    auth,
    setAuth,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
