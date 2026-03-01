import { Product } from '../types/productTypes';
import { useAppContext } from './useAppContext';

export const useFavourites = () => {
  const { state, dispatch } = useAppContext();

  const addToFavourites = (item: Product) => {
    dispatch({ type: 'ADD_TO_FAVOURITES', payload: item });
  };

  const removeFromFavourites = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: id });
  };

  return {
    favourites: state.favourites,
    addToFavourites,
    removeFromFavourites,
  };
};
