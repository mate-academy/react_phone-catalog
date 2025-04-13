import './ButtonCard.scss';
import React from 'react';
import classNames from 'classnames';
import { useFavorites } from '../Favorites/FavoritesContext';
import { ProductType } from '../../types/ProductType';
import { DeviceType } from '../../types/DeviceType';
import { useCart } from '../Cart/CartContext';

type Props = {
  details: boolean;
  product: ProductType | DeviceType;
};

export const ButtonCard: React.FC<Props> = ({ details, product }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { cart, addToCart } = useCart();

  const isFavorites = favorites.some(
    fav => String(fav.id) === String(product.id),
  );

  const isInCart = cart.some(item => String(item.id) === String(product.id));

  const handleFavoritesClick = () => {
    if (isFavorites) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
    }
  };

  return (
    <div
      className={classNames('button-card', {
        'button-card--details': details,
      })}
    >
      <button
        type="button"
        className={classNames(
          'button-card__add',
          'text',
          'text__body--buttons',
          {
            'button-card--details-add': details,
            'button-card__add--added': isInCart,
          },
        )}
        onClick={handleAddToCart}
        disabled={isInCart}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        type="button"
        className={classNames(
          'button-card',
          'button-card__like',
          'icon',
          'icon--heart',
          {
            'button-card--details-like': details,
            'icon--heart-fill': isFavorites,
          },
        )}
        onClick={handleFavoritesClick}
      ></button>
    </div>
  );
};
