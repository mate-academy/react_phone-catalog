import React, { useContext } from 'react';
import classNames from 'classnames';
import { AppContext } from '../../context/AppContextProvider';
import { Product } from '../../types/Product';
import './buttonAddToCart.scss';

export type Props = {
  isProductInFav: boolean,
  isProductInCart: boolean,
  product: Product,
};

export const ButtonAddToCart: React.FC<Props> = ({
  isProductInFav,
  isProductInCart,
  product,
}) => {
  const { toggleToFavorites, toggleToCart } = useContext(AppContext);

  const toggleToFav = () => {
    toggleToFavorites(product);
  };

  const toggleToCheckout = () => {
    toggleToCart(product);
  };

  return (
    <div className="buttons-container">
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className={classNames(
          'button button_add-to-cart',
          { selected: isProductInCart },
        )}
        onClick={toggleToCheckout}
      >
        {isProductInCart ? 'Added' : 'Add to cart'}
      </button>
      {/* eslint-disable-next-line */}
      <button
        data-cy="addToFavorite"
        type="button"
        className={classNames(
          'button button_like',
          { selected: isProductInFav },
        )}
        onClick={toggleToFav}
      />
    </div>
  );
};
