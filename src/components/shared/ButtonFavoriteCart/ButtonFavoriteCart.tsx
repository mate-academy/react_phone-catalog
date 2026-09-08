import React, { useCallback, useContext } from 'react';
import './ButtonFavoriteCart.scss';
import { GlobalContext } from '../../context/GlobalContext';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { icons } from '../../../constants/icons';

type Props = {
  productId: string;
};

export const ButtonFavoriteCart: React.FC<Props> = ({ productId }) => {
  const { allProducts, cart, favorites, toggleFavorites, addToCart } =
    useContext(GlobalContext);

  const isFavorite = favorites.some(favorite => favorite.itemId === productId);

  const isInCart = cart.some(cartProduct => cartProduct.itemId === productId);

  const handleCart = useCallback(() => {
    const productToAdd = allProducts.find(prod => prod.itemId === productId);

    if (productToAdd) {
      addToCart(productToAdd);
    }
  }, [addToCart, allProducts, productId]);

  const handleFavorites = useCallback(() => {
    const favoriteProduct = allProducts.find(prod => prod.itemId === productId);

    if (favoriteProduct) {
      toggleFavorites(favoriteProduct);
    }
  }, [allProducts, productId, toggleFavorites]);

  return (
    <div className="buttons">
      <button
        className={classNames('button__cart', {
          'button__cart--active': isInCart,
        })}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          handleCart();
        }}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </button>

      <button
        className={classNames('button__favorite', {
          'button__favorite--active': isFavorite,
        })}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          handleFavorites();
        }}
      >
        {isFavorite ? (
          <Icon icon={icons.favoriteFilled} />
        ) : (
          <Icon icon={icons.favorite} />
        )}
      </button>
    </div>
  );
};
