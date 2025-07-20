import { Navigate } from "react-router-dom";

export default function ProtectedGuestRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? <Navigate to="/" /> : children;
}
