import styles from './productcard.module.scss';
import heardBuron from './productCard-logo/Favourites.png';
import heardBuronActive from './productCard-logo/favoriteActive.png';
import { Product } from '../../services/productType';
import React, { useEffect, useState } from 'react';
// import { useLocalStorage } from '../../local/localStorege';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { addToCart, addToFavorites } from '../../feachers/detailSlice';

type Props = {
  item: Product;
};

export const ButtonsAddandFavorits: React.FC<Props> = ({ item }) => {
  // const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  // const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const cart = useAppSelector(state => state.cartAndFavorits.cart);
  const favorites = useAppSelector(state => state.cartAndFavorits.favorites);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line no-console
  console.log(favorites);

  // eslint-disable-next-line no-console
  console.log(item);

  useEffect(() => {
    const isItemInFavorites = favorites.some(favItem => favItem.id === item.id);

    setIsFavorite(isItemInFavorites);
  }, [favorites, item]);

  useEffect(() => {
    const isItemInCart = cart.some(carItem => carItem.id === item.id);

    setIsCart(isItemInCart);
  }, [cart, item]);

  const handlerAddFavorites = () => {
    // setFavorites(prevFavorites => {
    //   if (isFavorite) {
    //     return prevFavorites.filter(favItem => favItem.id !== item.id);
    //   } else {
    //     return [...prevFavorites, item];
    //   }
    // });
    dispatch(addToFavorites(item));
  };

  const handlerAddProduct = () => {
    // setCart(prevCart => {
    //   if (isCart) {
    //     return prevCart.filter(carItem => carItem.id !== item.id);
    //   } else {
    //     return [...prevCart, item];
    //   }
    // });

    dispatch(addToCart(item));
  };

  return (
    <>
      <div className={styles.cardButtons}>
        <button
          className={!isCart ? `${styles.addCard}` : `${styles.addedCart}`}
          onClick={handlerAddProduct}
        >
          {!isCart ? 'Add to cart' : 'Added'}
        </button>
        <button className={styles.like} onClick={handlerAddFavorites}>
          {!isFavorite ? (
            <img
              className={styles.heardIcon}
              src={heardBuron}
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
