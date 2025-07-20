export const getActivitiesApi = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/activities`, {
    headers: {
      "Content-Type": "application/json",
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
