const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

//Appel API pour l'authentification
export const loginApi = async (payload) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw {
      status: response.status,
      message: response.statusText,
      data: await response?.json(),
    };
  }

  return await response.json();
};

//Appel API pour la déconnexion
export const logoutApi = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (!response.ok) {
    throw {
      status: response.status,
      message: response.statusText,
    };
  }

  return await response.json();
};

//Appel API pour récupérer les données de l'utilisateur
export const getUserDataApi = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (!response.ok) {
    throw {
      status: response.status,
      message: response.statusText,
    };
  }

  return await response.json();
};
