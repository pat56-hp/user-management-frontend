const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

//Récupération des statistiques des utilisateurs
export const getStatisticApi = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/statistics/all`,
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  if (!response.ok) {
    throw {
      message: response.statusText,
      status: response.status,
    };
  }

  return await response.json();
};

//Recuperations de tous les utilisateurs
export const getUsersApi = async (search = "") => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users?search=${search}`,
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  if (!response.ok) {
    throw {
      message: response.statusText,
      status: response.status,
    };
  }

  return await response.json();
};

//Sauvegarde des infos d'un utilisateur
export const storeUserApi = async (payload) => {
  const formData = new FormData();
  for (const key in payload) {
    formData.append(key, payload[key]);
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw {
      message: response.statusText,
      status: response.status,
      data: await response?.json(),
    };
  }

  return await response.json();
};

//Modification des infos d'un utilisateur
export const updateUserApi = async (payload, userId) => {
  const formData = new FormData();
  for (const key in payload) {
    formData.append(key, payload[key]);
  }
  formData.append("_method", "PUT");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw {
      message: response.statusText,
      status: response.status,
      data: await response?.json(),
    };
  }

  return await response.json();
};

//Suppression d'un utilisateur
export const deleteUserApi = async (userId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  if (!response.ok) {
    throw {
      message: response.statusText,
      status: response.status,
    };
  }

  return await response.json();
};

//Modification du statut d'un utilisateur
export const updateUserStatusApi = async (userId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${userId}/change-status`,
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  if (!response.ok) {
    throw {
      message: response.statusText,
      status: response.status,
    };
  }

  return await response.json();
};
