import React, { useContext } from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { FavouritesContext } from '../../store/FavouritesContex';
import { CartContext } from '../../store/CartContext';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import fav from '../../images/icons/favourites.svg';
import favDark from '../../images/icons/fav_for_dark.svg';
import favHeart from '../../images/icons/favourites_heart.svg';
import styles from './Buttons.module.scss';

type Props = {
  product: Product;
};

export const Buttons: React.FC<Props> = ({ product }) => {
  const { favourites, handleFavourites } = useContext(FavouritesContext);
  const { cartProducts, addToCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  const { itemId } = product;

  const isFavourite = favourites.find(favItem => favItem.itemId === itemId);
  const isCartProducts = cartProducts.find(cartItem => cartItem.id === itemId);

  return (
    <>
      <div className={styles.button}>
        <button
          onClick={() => addToCart(product)}
          className={cn(styles.button__add, {
            [styles['button__add--active']]: isCartProducts,
            [styles['button__add--dark']]: theme === Theme.Dark,
            [styles['button__add--dark--active']]:
              isCartProducts && theme === Theme.Dark,
          })}
        >
          {isCartProducts ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={cn(styles.button__fav, {
            [styles['button__fav--dark']]: theme === Theme.Dark,
            [styles['button__fav--active']]: isFavourite,
            [styles['button__fav--dark--active']]:
              isFavourite && theme === Theme.Dark,
          })}
          onClick={() => handleFavourites(product)}
        >
          <img
            src={
              isFavourite
                ? theme === Theme.Dark
                  ? favHeart
                  : favHeart
                : theme === Theme.Dark
                  ? favDark
                  : fav
            }
            alt="Favourites"
            className={styles['button__img-fav']}
          />
        </button>
      </div>
    </>
  );
};
