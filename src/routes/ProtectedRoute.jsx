import { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      console.warn("Protected route accessed without authentication.");
    }
  }, []);
  //return user ? children : <Navigate to="/login" />;
  return children;
}
