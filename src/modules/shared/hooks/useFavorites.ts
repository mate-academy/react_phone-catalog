//#region imports
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { add, remove } from '../../../store/slices/favoritesSlice';
import { Product } from '../types/Product';
//#endregion

export const useFavorites = (id: string, product: Product) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites);

  const isFavourite = favorites.some(item => item.itemId === id);

  const toggleFavorites = () => {
    if (isFavourite) {
      dispatch(remove(id));
    } else {
      dispatch(add(product));
    }
  };

  return {
    isFavourite,
    toggleFavorites,
  };
};
