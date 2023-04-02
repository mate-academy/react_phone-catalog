import React, { useContext } from 'react';
import { CatalogContext } from '../../context';
import { FavoritesAction } from '../../enums/enums';
import { Product } from '../../types/Product';
import { Button } from '../Button';

type Props = {
  size: string;
  product: Product;
};

export const FavouriteButton: React.FC<Props> = ({ size, product }) => {
  const { favorites, dispatchFavorites } = useContext(CatalogContext);

  const isFavorite = favorites.some(item => item.id === product.id);
  const onFavoriteClick = () => (
    isFavorite
      ? dispatchFavorites({ type: FavoritesAction.REMOVE, payload: product.id })
      : dispatchFavorites({ type: FavoritesAction.ADD, payload: product })
  );

  return (
    <Button
      height={size}
      width={size}
      handler={onFavoriteClick}
      type="button--favour"
    >
      {isFavorite ? (
        <img src="/img/icons/favouritesFilled.svg" alt="favourites" />
      ) : (
        <img src="/img/icons/favourites.svg" alt="favourites" />
      )}
    </Button>
  );
};
