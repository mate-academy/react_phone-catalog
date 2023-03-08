import React, { useContext } from 'react';
import classNames from 'classnames';
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

  return (
    <button
      className={classNames(
        'favorite-button',
        {
          'favorite-button--big': isBigButton,
        },
      )}
      type="button"
      onClick={handleClick}
      data-cy="addToFavorite"
    >
      {isInFavorites(product)
        ? (
          <img src={favoritesIconRed} alt="heart icon" />
        ) : (
          <img src={favoritesIcon} alt="heart icon" />
        )}
    </button>
  );
};

FavoriteButton.defaultProps = {
  isBigButton: false,
};
