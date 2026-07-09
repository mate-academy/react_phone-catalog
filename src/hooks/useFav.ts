import { useContext } from 'react';
import { FavDispatchContext } from '../contexts/favorites';
import { ProductPreview } from '../types';

export const useFav = () => {
  const dispatch = useContext(FavDispatchContext);

  const addToFav = (product: ProductPreview) => {
    dispatch({ type: 'add', payload: product });
  };

  const removeFromFav = (product: ProductPreview) => {
    dispatch({ type: 'remove', payload: product.id });
  };

  return {
    addToFav,
    removeFromFav,
  };
};
