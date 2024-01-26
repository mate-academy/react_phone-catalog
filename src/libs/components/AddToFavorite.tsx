import { useCallback, useContext } from 'react';

import { StateContext } from './state-provider/state-context';
import {
  ButtonViews, IconColors, IconNames,
} from '../enums';
import { Button } from './button/Button';
import { ProductType } from '../types';
import { isProductInList, getUpdatedListWithProduct } from '../helpers';

type Props = {
  product: ProductType,
  className?: string,
};

export const AddToFavorite: React.FC<Props> = ({ product, className }) => {
  const { favorites, setFavorites } = useContext(StateContext);

  const isFavorite = isProductInList(favorites, product.id);

  const handleAddToFavorites = useCallback(() => {
    const favoritesProducts
      = getUpdatedListWithProduct(favorites, product, isFavorite);

    setFavorites(favoritesProducts);
  }, [favorites, product, isFavorite, setFavorites]);

  return (
    <Button
      className={className}
      icon={isFavorite ? IconNames.FAVORITE_ACTIVE : IconNames.FAVORITE}
      iconOptions={isFavorite ? { color: IconColors.RED } : undefined}
      view={ButtonViews.ICON_BORDER}
      onClick={handleAddToFavorites}
      data-cy="addToFavorite"
    />
  );
};
