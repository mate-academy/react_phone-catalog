import React from 'react';
import { Product } from '../../utils/Product';
import style from './Buttons.module.scss';
import classNames from 'classnames';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavouritesContext';

type Props = {
  product: Product | null;
  selectedColor?: string | null;
  selectedCapacity?: string | null;
};

export const Buttons: React.FC<Props> = ({
  product,
  selectedColor,
  selectedCapacity,
}) => {
  const favoritesContext = useFavorites();

  if (!favoritesContext) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  const { favorites, toggleFavorite } = favoritesContext;

  const cartContext = useCart();

  if (!cartContext) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { cart, addToCart } = cartContext;

  const isFavorite = product ? favorites.some(f => f.id === product.id) : false;
  const isInCart = product ? cart.some(item => item.id === product.id) : false;

  return (
    <div className={style.productButton}>
      <button
        className={`${style.productButtonAdd} ${isInCart ? style.inCart : ''}`}
        onClick={e => {
          e.stopPropagation();
          if (product) {
            addToCart({
              ...product,
              selectedColor: selectedColor ?? undefined,
              selectedCapacity: selectedCapacity ?? undefined,
            });
          }
        }}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        className={classNames(style.productButtonFavourite, {
          [style.productButtonFavouriteActive]: isFavorite,
        })}
        onClick={e => {
          e.stopPropagation();
          if (product) {
            toggleFavorite(product);
          }
        }}
      >
        <img
          src={
            isFavorite
              ? 'img/icons/Favourites Filled (Heart Like).svg'
              : 'img/icons/Favourites (Heart Like).svg'
          }
          alt="favourites icon"
          className={style.productButtonIcon}
        />
      </button>
    </div>
  );
};
