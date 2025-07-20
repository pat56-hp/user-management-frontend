import React, { useState } from "react";
import { getActivitiesApi } from "../api/activityApi";
import { useAuth } from "../auth/AuthProvider";
import { toast } from "sonner";

export default function useActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const { clearData } = useAuth();

  //colonne des activités
  const columns = [
    {
      key: "action",
      label: "Action",
    },
    {
      key: "pays",
      label: "Pays",
      render: (activity) => (
        <span>
          {activity.pays} {activity.codepays && `(${activity.codepays})`}
        </span>
      ),
    },
    {
      key: "navigator",
      label: "Navigateur",
      render: (activity) => (
        <span>
          {activity.navigator} <br />
          {activity.ip}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Date",
    },
  ];

  //Recuperation des activités
  const getActivities = () => {
    setLoading(true);
    getActivitiesApi()
      .then((resp) => setActivities(resp))
      .catch((error) => {
        const { status } = error;
        if (status === 401) {
          clearData();
        }

        console.error("Erreur de recuperation des activités:", error);
        toast.error(
          "Une erreur s'est produite lors de la récupération des activités"
        );
      });
    setLoading(false);
  };

  return {
    columns,
    activities,
    loading,
    getActivities,
  };
}
