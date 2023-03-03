import React, { useContext } from 'react';
import classNames from 'classnames';
import './ButtonFavourite.scss';

import { Product } from '../../types/Product';
import { ProductsContext } from '../../helpers/ProductsContext';
import favouritesIcon from '../../images/favourites.svg';
import favouritesIconRed from '../../images/favourites-red.svg';

type Props = {
  product: Product;
  isBigButton?: boolean;
};

export const ButtonFavourite: React.FC<Props> = ({ product, isBigButton }) => {
  const {
    addProductToFavourites,
    isInFavourites,
  } = useContext(ProductsContext);

  return (
    <button
      className={classNames(
        'button-favourite',
        {
          'button-favourite--big': isBigButton,
        },
      )}
      type="button"
      onClick={() => addProductToFavourites(product)}
      data-cy="addToFavorite"
    >
      {!isInFavourites(product)
        ? (
          <img src={favouritesIcon} alt="heart icon" />
        ) : (
          <img src={favouritesIconRed} alt="heart icon" />
        )}
    </button>
  );
};

ButtonFavourite.defaultProps = {
  isBigButton: false,
};
