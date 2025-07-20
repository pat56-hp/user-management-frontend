import { createContext, useContext, useEffect, useState } from "react";
import { getUserDataApi, loginApi, logoutApi } from "../api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  clearData: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Connexion de l'utilisateur
  const login = async (payload) => {
    try {
      const { access_token } = await loginApi(payload);

      // Stockage du token dans le localStorage
      localStorage.setItem("access_token", access_token);

      //Recuperation des données de l'utilisateur après la connexion
      getUserData();
    } catch (error) {
      console.error("Une erreur s'est produite pdt la connexion:", error);
      throw error;
    }
  };

  //Déconnexion de l'utilisateur
  const logout = async () => {
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/login");
  };

  //Récupération des données de l'utilisateur
  const getUserData = async () => {
    try {
      const { data } = await getUserDataApi();
      setUser(data);
    } catch (err) {
      const { status } = err;
      if (status === 401) {
        clearData();
      }
      console.error(
        "Une erreur s'est produite lors de la récupération des données utilisateur:",
        err
      );

      console.log(err);
      //setUser(null);
    }
  };

  //Supprime toutes les datas en local
  const clearData = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    toast.error("Session expirée, veuillez vous reconnecter...");
    navigate("/login");
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, clearData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
