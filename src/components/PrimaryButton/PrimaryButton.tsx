import { useContext } from 'react';
import classNames from 'classnames';
import './PrimaryButton.scss';

import { Product } from '../../types/Product';
import {
  CartContext, FavoritesContext,
} from '../../helpers/LocaleStorageContext';

type Props = {
  className?: string,
  product?: Product,
};

export const PrimaryButton: React.FC<Props> = ({ className, product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const isInCart = cart.some(cartItem => cartItem.id === product?.id);
  const isInFavorites = favorites.some(favItem => favItem.id === product?.id);

  const handleClickAddToCart = () => {
    if (!product) {
      return;
    }

    if (cart.length === 0) {
      setCart([
        {
          id: product.id,
          quantity: 1,
          product,
        },
      ]);

      return;
    }

    if (isInCart) {
      const newArr = cart.filter((cartItem) => cartItem.id !== product.id);

      setCart(newArr);

      return;
    }

    setCart([
      ...cart,
      {
        id: product.id,
        quantity: 1,
        product,
      },
    ]);
  };

  const handleClickAddToFavorites = () => {
    if (!product) {
      return;
    }

    if (favorites.length === 0) {
      setFavorites([product]);

      return;
    }

    if (isInFavorites) {
      const newArr = favorites.filter((favItem) => favItem.id !== product.id);

      setFavorites(newArr);

      return;
    }

    setFavorites([
      ...favorites,
      product,
    ]);
  };

  return (
    <div className={`primary-button ${className}`}>
      <button
        type="button"
        className={classNames(
          'primary-button__buy',
          { 'primary-button__buy--is-added': isInCart },
        )}
        onClick={handleClickAddToCart}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        type="button"
        className="primary-button__favorite"
        onClick={handleClickAddToFavorites}
        data-cy="addToFavorite"
      >
        {isInFavorites
          ? (
            <img
              src="icons/favourites-filled.svg"
              alt="button favourite"
            />
          )
          : (
            <img
              src="icons/favourites.svg"
              alt="button favourite"
            />
          )}
      </button>
    </div>
  );
};
