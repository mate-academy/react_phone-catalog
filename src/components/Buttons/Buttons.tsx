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
  const favouriteContext = useFavorites();

  if (!favouriteContext) {
    throw new Error('useFavourite must be use with in a FavouriteProvide');
  }

  const { favorites, toggleFavorite } = favouriteContext;

  const CartContext = useCart();

  if (!CartContext) {
    throw new Error('useCart must be used with in a CartProvide');
  }

  const { cart, addToCart } = CartContext;

  const isFavorite = product ? favorites.some(f => f.id === product.id) : false;
  const isInCart = product ? cart.some(item => item.id === product.id) : false;

  return (
    <div className={style.productBtn}>
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
              ? 'img/icons/Favourites (Heart Like).svg'
              : 'img/icons/Favourites Filled (Heart Like).svg'
          }
          alt="favourite icon"
          className={style.productBtnIcon}
        />
      </button>
    </div>
  );
};
