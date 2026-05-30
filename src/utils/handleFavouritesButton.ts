import { useContext } from 'react';
import { Product } from '../types/Product';
import { DispatchContext, StateContext } from '../Store/Store';

export const useFavouritesButton = () => {
  const dispatch = useContext(DispatchContext);
  const { favourites } = useContext(StateContext);

  const handleFavouritesButton = (product: Product) => {
    if (favourites.some(fav => fav.id === product.id)) {
      dispatch({ type: 'deleteFromFavourites', payload: product });
    } else {
      dispatch({ type: 'addToFavourites', payload: product });
    }
  };

  return { favourites, handleFavouritesButton };
};
