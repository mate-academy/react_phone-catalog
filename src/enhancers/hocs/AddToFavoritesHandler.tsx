import React, { memo, useCallback } from 'react';
import { ProductId } from '../../definitions/types/Product';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { favoritesActions } from '../../store/slices/favoritesSlice';

export interface AddToFavoritesHandlerRenderProps {
  onClick?: () => void,
  selected: boolean;
}

interface Props {
  productId: ProductId | null,
  render: (props: AddToFavoritesHandlerRenderProps) => React.ReactElement,
}

export const AddToFavoritesHandler: React.FC<Props> = memo(({
  productId,
  render,
}) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites);

  if (productId === null) {
    return render({ selected: false });
  }

  const isFavorite = Object.hasOwn(favorites, productId);

  const toggleProductInFavorites = useCallback(() => {
    dispatch(
      isFavorite
        ? favoritesActions.remove(productId)
        : favoritesActions.add(productId),
    );
  }, [productId, isFavorite]);

  return render({
    onClick: toggleProductInFavorites,
    selected: isFavorite,
  });
});
