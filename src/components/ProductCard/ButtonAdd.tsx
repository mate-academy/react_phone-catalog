import styles from './productcard.module.scss';
import heardBuron from './Pictures/Favourites.png';
import heardBuronActive from './Pictures/favoriteActive.png';
import heardBuronDark from './Pictures/favoritesDark.png';
import { Product } from '../../types/productType';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import {
  addFavorite,
  addToCart,
  removeFavorite,
  removeFromCart,
} from '../../Reducers/fauvoritsAndCartSlice';
import { Theme } from '../../Helpers/theme';
import classNames from 'classnames';

type Props = {
  item: Product;
};

export const ButtonsAddandFavorits: React.FC<Props> = ({ item }) => {
  const theme = useAppSelector(state => state.theme.theme);
  const isCart = useAppSelector(state =>
    state.cartAndFavorits.cart.some(cartItem => {
      return cartItem.product.id === item.id && cartItem.product.isCart;
    }),
  );

  const isFavorite = useAppSelector(state =>
    state.cartAndFavorits.favorites.some(
      fav => fav.id === item.id && fav.isFavorite,
    ),
  );

  const dispatch = useAppDispatch();

  const handlerAddFavorites = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const handlerAddProduct = () => {
    if (isCart) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(addToCart(item));
    }
  };

  const buttonClass = classNames({
    [styles.addCard]: !isCart,
    [styles.addedCart]: isCart,
    [styles.addCardDark]: theme === Theme.dark,
  });

  return (
    <>
      <div className={styles.cardButtons}>
        <button className={buttonClass} onClick={handlerAddProduct}>
          {!isCart ? 'Add to cart' : 'Remove from cart'}
        </button>
        <button
          className={theme === Theme.light ? styles.like : styles.likeDark}
          onClick={handlerAddFavorites}
        >
          {!isFavorite ? (
            <img
              className={styles.heardIcon}
              src={theme === Theme.light ? heardBuron : heardBuronDark}
              alt="Favorite"
            ></img>
          ) : (
            <img
              className={styles.heardIcon}
              src={heardBuronActive}
              alt="Favorite"
            ></img>
          )}
        </button>
      </div>
    </>
  );
};
