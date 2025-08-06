export const getImageUrl = (path) => {
  return `${import.meta.env.VITE_API_URL}/${path}`;
};

export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Mois = 0-11
  const day = String(d.getDate()).padStart(2, "0");
  return `${month}-${day}-${year}`;
};

export const convertToISOFormat = (dateStr) => {
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month}-${day}`;
};

export const formaterDate = (date) => {
  const jours = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const mois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const d = new Date(date);
  const jour = jours[d.getDay()];
  const numero = d.getDate();
  const moisNom = mois[d.getMonth()];

  return `${jour} ${numero} ${moisNom}`;
};
