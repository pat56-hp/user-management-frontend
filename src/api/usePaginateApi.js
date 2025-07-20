export const getDataFromPageUrl = async (url) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  if (!response.ok) {
    throw {
      message: response.statusText,
      status: response.status,
    };
  }

  return await response.json();
};
