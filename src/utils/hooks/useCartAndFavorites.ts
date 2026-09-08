import { useCallback, useContext, useMemo } from 'react';
import { CartFavouritesContext } from '../../contexts/CartFavouritesContext';
import { Product } from '../../types/Product';

export const useCartAndFavourites = (product: Product | null) => {
  const { state, dispatch } = useContext(CartFavouritesContext);
  const { favourites } = state;

  const handleAddToCart = useCallback(() => {
    if (product) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  }, [dispatch, product]);

  const isFavorite = useMemo(
    () => product && favourites.some(item => item.id === product.id),
    [favourites, product],
  );

  const handleToggleFavorite = useCallback(() => {
    if (product) {
      if (isFavorite) {
        dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: product.itemId });
      } else {
        dispatch({ type: 'ADD_TO_FAVOURITES', payload: product });
      }
    }
  }, [dispatch, product, isFavorite]);

  return { handleAddToCart, isFavorite, handleToggleFavorite };
};
