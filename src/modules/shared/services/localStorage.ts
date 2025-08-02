export const getFavouriteProducts = () => {
  return JSON.parse(localStorage.getItem('favouriteProducts') || '[]');
};
export const saveFavouriteProducts = (favouriteProducts: number[]) => {
  localStorage.setItem('favouriteProducts', JSON.stringify(favouriteProducts));
};
export const getCartProducts = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};
export const saveCartProducts = (cartProducts: number[]) => {
  localStorage.setItem('cart', JSON.stringify(cartProducts));
};
