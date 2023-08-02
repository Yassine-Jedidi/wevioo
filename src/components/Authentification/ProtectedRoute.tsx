import React from "react";
import { Navigate } from "react-router-dom";

interface AuthData {
  role: string;
  username: string;
  password: string;
  employeeId: string;
  seenModal: boolean;
  gender: string;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  // Retrieve authentication data from localStorage
  const authDataString = localStorage.getItem("auth");
  const authData: AuthData | null = authDataString
    ? (JSON.parse(authDataString) as AuthData)
    : null;

  if (authData && authData.role === requiredRole) {
    // If the authentication data exists and the role matches the required role
    return <>{children}</>;
  } else {
    // If authentication data doesn't exist or the role doesn't match
    // You can redirect to a different route or show a message indicating unauthorized access
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
