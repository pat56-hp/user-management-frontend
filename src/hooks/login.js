import React, { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      email: "",
      password: "",
    });

    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (!email || !password) {
      !email &&
        setErrors((prev) => ({
          ...prev,
          [payload.email]: "L'email est requis",
        }));
      !password &&
        setErrors((prev) => ({
          ...prev,
          [payload.password]: "Le mot de passe est requis",
        }));
      toast.error("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    //Connexion de l'utilisateur
    login(payload)
      .then(() => {
        toast.success("Connexion réussie");
        navigate("/");
      })
      .catch((err) => {
        const { status, data } = err;
        const { message, data: apiData } = data;
        if (status === 422) {
          //Erreur liée aux datas du formulaire
          Object.keys(apiData).map((key) => {
            setErrors((prev) => ({
              ...prev,
              [key]: apiData[key][0],
            }));
          });
        } else if (status === 401) {
          // Email ou mot de passe incorrecte
          setErrors((prev) => ({
            ...prev,
            email: message,
          }));
        }

        toast.error("Oups, une erreur s'est produite");
        setIsLoading(false);
      });
  };

  return {
    showPassword,
    setShowPassword,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    togglePasswordVisibility,
    handleSubmit,
  };
}
