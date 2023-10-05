export const addToFavorites = (productId) => ({
  type: 'ADD_TO_FAVORITES',
  payload: productId,
});

export const removeFromFavorites = (productId) => ({
  type: 'REMOVE_FROM_FAVORITES',
  payload: productId,
});
