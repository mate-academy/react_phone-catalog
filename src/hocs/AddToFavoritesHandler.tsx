import React, { memo, useCallback } from 'react';
import { Product } from '../types/Product';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { favoritesActions } from '../features/favoritesSlice';

export interface AddToFavoritesHandlerRenderProps {
  onClick: () => void,
  selected: boolean;
}

interface Props {
  product: Product,
  render: (props: AddToFavoritesHandlerRenderProps) => React.ReactElement,
}

export const AddToFavoritesHandler: React.FC<Props> = memo(({
  product,
  render,
}) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites);
  const isFavorite = Object.hasOwn(favorites, product.id);

  const toggleProductInFavorites = useCallback(() => {
    dispatch(
      isFavorite
        ? favoritesActions.remove(product)
        : favoritesActions.add(product),
    );
  }, [product, isFavorite]);

  return render({
    onClick: toggleProductInFavorites,
    selected: isFavorite,
  });
});
