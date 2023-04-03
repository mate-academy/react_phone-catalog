import React, { useContext, useMemo } from 'react';
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
  const imagePath = useMemo(() => (
    isFavorite
      ? './img/icons/favouritesFilled.svg'
      : './img/icons/favourites.svg'
  ), [isFavorite]);

  return (
    <Button
      height={size}
      width={size}
      handler={onFavoriteClick}
      type="button--favour"
    >
      <img src={imagePath} alt="favourites" />
    </Button>
  );
};
