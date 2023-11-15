import { useContext, useMemo } from 'react';
import { Product } from '../types/Product';
import { FavouriteContext } from '../context/FavouriteContext';

export const useHandleToFavourite = (product: Product) => {
  const { favourites, setFavourites } = useContext(FavouriteContext);
  const isItemInFavourites = useMemo(() => {
    return favourites.some(item => item.id === product.id);
  }, [favourites]);

  if (!product) {
    return;
  }

  if (!isItemInFavourites) {
    const newFavourites = [...favourites, product];

    setFavourites(newFavourites);
    localStorage.setItem('favourites', JSON.stringify(newFavourites));
  } else {
    const newFavourites = [...favourites].filter(
      item => item.id !== product.id,
    );

    setFavourites(newFavourites);
    localStorage.setItem('favourites', JSON.stringify(newFavourites));
  }
};
