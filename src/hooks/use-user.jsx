import React, { useState } from "react";
import { toast } from "sonner";
import {
  deleteUserApi,
  getUsersApi,
  storeUserApi,
  updateUserApi,
  updateUserStatusApi,
} from "../api/userApi";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Edit, ToggleLeft, ToggleRight, Trash, UserCircle } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";

export default function useUser() {
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState();
  const [userId, setUserId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  const { clearData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    nom: "",
    email: "",
    password: "",
    role: "",
    avatar: "",
  });

  //Colonne du tableau des utilisateurs
  const columns = [
    {
      key: "nom",
      label: "Nom",
      render: (user) => (
        <div className="flex flex-row gap-3 items-center">
          <img
            src={user.avatar}
            className="rounded-full w-10 h-10 object-cover"
          />
          {user.nom}
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      render: (user) => <Badge variant="default">{user.role}</Badge>,
    },
    {
      key: "actif",
      label: "Statut",
      render: (user) => (
        <Badge variant={user.actif === "Oui" ? "success" : "danger"}>
          {user.actif}
        </Badge>
      ),
    },
    {
      key: "created_at",
      label: "Date de création",
    },
    {
      key: "action",
      label: "Action",
      render: (user) => (
        <div className="flex flex-row gap-1">
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setUser(user);
              setOpenDialog(true);
            }}
          >
            <Edit />
          </Button>
          <Button
            variant={user.actif === "Oui" ? "success" : "warning"}
            size="sm"
            title={user.actif === "Oui" ? "Désactiver" : "Activer"}
            onClick={() => {
              setUserId(user.id);
              setOpenStatusDialog(true);
            }}
          >
            {user.actif === "Oui" ? <ToggleRight /> : <ToggleLeft />}
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setUserId(user.id);
              setOpenDeleteDialog(true);
            }}
          >
            <Trash />
          </Button>
        </div>
      ),
    },
  ];

  //Recuperation des users
  const getUsers = () => {
    setIsLoading(true);
    getUsersApi()
      .then((rep) => {
        setData(rep);
        setStatistics(rep.statistics || {});
      })
      .catch((err) => {
        const { status } = err;
        if (status === 401) {
          clearData();
        }
        console.log(err);
        toast.error("Une erreur s'est produite");
      });

    setIsLoading(false);
  };

  //Creation d'un utilisateur
  const createData = (payload, setPayload, onSetOpen, getUsers) => {
    storeUserApi(payload)
      .then(() => {
        toast.success("Utilisateur créé avec succès");
        setPayload({
          nom: "",
          email: "",
          password: "",
          avatar: "",
          role: "admin",
        });
        getUsers();
        onSetOpen(false);
      })
      .catch((err) => {
        const { data, status } = err;
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
          clearData();
        }

        toast.error(message);
      });
  };

  //Modification d'un utilisateur
  const updateData = (payload, onSetOpen, getUsers, userId) => {
    updateUserApi(payload, userId)
      .then(() => {
        toast.success("Utilisateur modifié avec succès");
        getUsers();
        onSetOpen(false);
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
          clearData();
        }

        toast.error(message);
      });
  };

  //Soumission du formulaire
  const handleSubmit = (
    e,
    payload,
    setPayload,
    onSetOpen,
    getUsers,
    userId = null
  ) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({
      nom: "",
      email: "",
      password: "",
      role: "",
      image: "",
    });

    const { nom, email, password, role } = payload;

    //Verifie si tous les champs sont remplis
    if (!nom || !email || !role) {
      !nom &&
        setErrors((prev) => ({
          ...prev,
          nom: "Le nom est obligatoire",
        }));
      !email &&
        setErrors((prev) => ({
          ...prev,
          email: "L'email est obligatoire",
        }));
      //Uniquement pour la creation d'un utilisateur
      !password &&
        !userId &&
        setErrors((prev) => ({
          ...prev,
          password: "Le mot de passe est obligatoire",
        }));
      !role &&
        setErrors((prev) => ({
          ...prev,
          role: "Le role est obligatoire",
        }));

      toast.error("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    //Sauvegarde API
    if (!userId) {
      createData(payload, setPayload, onSetOpen, getUsers);
    } else {
      updateData(payload, onSetOpen, getUsers, userId);
    }

    setIsLoading(false);
  };

  //Suppression d'un user
  const deleteUser = (userId, onSetOpen, getUsers) => {
    setIsLoading(true);
    deleteUserApi(userId)
      .then(() => {
        getUsers();
        setIsLoading(false);
        onSetOpen(false);
        toast.success("Utilisateur supprimé avec succès");
      })
      .catch((err) => {
        const { status } = err;
        if (status === 401) {
          clearData();
        }
        toast.error("Une erreur s'est produite");
        setIsLoading(false);
      });
  };

  //Modifier le statut d'un user
  const changeStatus = (userId, onSetOpen, getUsers) => {
    setIsLoading(true);
    updateUserStatusApi(userId)
      .then(() => {
        getUsers();
        onSetOpen(false);
        toast.success("Statut de l'utilisateur modifié avec succès");
      })
      .catch((err) => {
        const { status } = err;
        if (status === 401) {
          clearData();
        }
        toast.error("Une erreur s'est produite");
      });

    setIsLoading(false);
  };

  return {
    columns,
    data,
    setData,
    errors,
    setErrors,
    userId,
    isLoading,
    user,
    setUser,
    openDialog,
    setOpenDialog,
    openDeleteDialog,
    setOpenDeleteDialog,
    openStatusDialog,
    setOpenStatusDialog,
    getUsers,
    statistics,
    deleteUser,
    changeStatus,
    handleSubmit,
  };
}
