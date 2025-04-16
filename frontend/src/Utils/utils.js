export const getImageUrl = (path) => {
    return `${import.meta.env.VITE_API_URL}/${path}`;
};