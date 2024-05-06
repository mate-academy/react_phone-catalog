import styles from './productcard.module.scss';
import heardBuron from './productCard-logo/Favourites.png';
import heardBuronActive from './productCard-logo/favoriteActive.png';
import { Product } from '../../services/productType';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../local/localStorege';

type Props = {
  item: Product;
};

export const ButtonsAddandFavorits: React.FC<Props> = ({ item }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCart, setIsCart] = useState(false);

  useEffect(() => {
    const isItemInFavorites = favorites.some(favItem => favItem.id === item.id);

    setIsFavorite(isItemInFavorites);
  }, [favorites, item]);

  useEffect(() => {
    const isItemInCart = cart.some(carItem => carItem.id === item.id);

    setIsCart(isItemInCart);
  }, [cart, item]);

  const handlerAddFavorites = () => {
    setFavorites(prevFavorites => {
      if (isFavorite) {
        return prevFavorites.filter(favItem => favItem.id !== item.id);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  const handlerAddProduct = () => {
    setCart(prevCart => {
      if (isCart) {
        return prevCart.filter(carItem => carItem.id !== item.id);
      } else {
        return [...prevCart, item];
      }
    });
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
