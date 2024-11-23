export const getFavoritesFromLS = () => {
  const data = localStorage.getItem('favorites');

  return data ? JSON.parse(data) : [];
};
