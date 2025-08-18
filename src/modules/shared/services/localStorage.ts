export const getFavouriteProducts = () => {
  return JSON.parse(localStorage.getItem('favouriteProducts') || '[]');
};
export const saveFavouriteProducts = (ids: string[]) => {
  localStorage.setItem('favouriteProducts', JSON.stringify(ids));
};
export const getCartProducts = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};
export const saveCartProducts = (ids: string[]) => {
  localStorage.setItem('cart', JSON.stringify(ids));
};
export const getTheme = () => {
  return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
};
export const saveTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem('theme', theme);
};
