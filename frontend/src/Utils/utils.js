export const getImageUrl = (path) => {
  return `${import.meta.env.VITE_API_URL}/${path}`;
};

export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Mois = 0-11
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
