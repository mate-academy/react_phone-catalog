export const getFavouriteProducts = () => {
  return JSON.parse(localStorage.getItem('favouriteProducts') || '[]');
};
export const saveFavouriteProducts = (ids: number[]) => {
  localStorage.setItem('favouriteProducts', JSON.stringify(ids));
};
export const getCartProducts = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};
export const saveCartProducts = (ids: number[]) => {
  localStorage.setItem('cart', JSON.stringify(ids));
};
