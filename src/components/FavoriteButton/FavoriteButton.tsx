import React, { useContext, useMemo } from 'react';
import cn from 'classnames';
import './FavoriteButton.scss';

import { Product } from '../../types/Product';
import { ProductsContext } from '../../helpers/ProductsContext';
import favoritesIcon from '../../images/favorites.svg';
import favoritesIconRed from '../../images/favorites-red.svg';

type Props = {
  product: Product;
  isBigButton?: boolean;
};

export const FavoriteButton: React.FC<Props> = ({ product, isBigButton }) => {
  const {
    addProductToFavorites,
    isInFavorites,
  } = useContext(ProductsContext);

  const handleClick = () => addProductToFavorites(product);

  const imageSrc = useMemo(() => {
    const isFavoriteProduct = isInFavorites(product);

    return isFavoriteProduct ? favoritesIconRed : favoritesIcon;
  }, [isInFavorites]);

  return (
    <button
      className={cn('favorite-button', {
        'favorite-button--big': isBigButton,
      })}
      type="button"
      onClick={handleClick}
      data-cy="addToFavorite"
    >
      <img src={imageSrc} alt="heart icon" />
    </button>
  );
};

FavoriteButton.defaultProps = {
  isBigButton: false,
};
