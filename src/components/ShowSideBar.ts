import { useLocation } from "react-router-dom";

export default function ShowSideBar() {
  const location = useLocation();
  const loginPath = "/login";

  // Check if the current path matches the login path
  const isLoginPage = location.pathname === loginPath;

  return !isLoginPage; // Return true if it's not the login page (to show sidebar)
}