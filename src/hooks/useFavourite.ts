import { Product } from '../types/Product';
import { MouseEventHandler, useContext } from 'react';
import { FavouriteContext } from '../ContextProvider';

export const useFavourite = (
  id: string,
  product: Product | undefined,
): [boolean, MouseEventHandler<HTMLButtonElement>] => {
  const { favouriteProducts, setFavouriteProducts } =
    useContext(FavouriteContext);

  const isAddedToFavourite = !!favouriteProducts.find(item => item?.id === id);

  const addToFavourite: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    setFavouriteProducts(
      isAddedToFavourite
        ? favouriteProducts.filter(item => item.id !== id)
        : product
          ? [...favouriteProducts, product]
          : [...favouriteProducts],
    );
  };

  return [isAddedToFavourite, addToFavourite];
};
