import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { favouritesActions } from '../../FavouritesPage/features/favouritesSlice';
import { favouritesSelectors } from '../../FavouritesPage/selectors/favouritesSelectors';
import type { RootState } from '../../../store';
import type { Product } from '../../../types';
import { useCallback } from 'react';

export const useFavourites = (product?: Product) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const isInFavourites = useSelector((state: RootState) =>
    product
      ? favouritesSelectors.selectIsInFavourites(state, product.itemId)
      : false,
  );

  const handleToggleFavourite = useCallback(() => {
    if (product) {
      dispatch(favouritesActions.toggleFavourite(product));
    }
  }, [dispatch, product]);

  const filteredFavourites = useSelector((state: RootState) =>
    favouritesSelectors.selectFiltered(state, query),
  );

  const totalFavourites = useSelector(favouritesSelectors.selectTotal);

  return {
    isInFavourites,
    handleToggleFavourite,
    filteredFavourites,
    totalFavourites,
    query,
  };
};
