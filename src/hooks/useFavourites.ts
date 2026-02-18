import { useDispatch, useSelector } from 'react-redux';
import { favouritesActions } from '../features/favouritesSlice';
import { favouritesSelectors } from '../selectors/favouritesSelectors';
import type { RootState } from '../store';
import type { Product } from '../types';

export const useFavourites = (product: Product) => {
  const dispatch = useDispatch();
  const isInFavourites = useSelector((state: RootState) =>
    favouritesSelectors.selectIsInFavourites(state, product.itemId),
  );

  const handleToggleFavourite = () => {
    dispatch(favouritesActions.toggleFavourite(product));
  };

  return { isInFavourites, handleToggleFavourite };
};
