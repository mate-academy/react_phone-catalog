/* eslint-disable max-len */
import styles from './ProductCard.module.scss';
import { Product } from '../../../types/Product';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  addToCart,
  addTofavorite,
  deleteFromfavorite,
} from '../../../features/chosenItemsSlice';
import { useEffect, useState } from 'react';
import { addToItemsQuantity } from '../../../features/pagesDetailsSlice';

type Props = {
  gadget: Product;
};

export const ProductCard: React.FC<Props> = ({ gadget }) => {
  const dispatch = useAppDispatch();

  const [heartIco, setHeartIco] = useState('./icons/heart-ico.svg');
  const [isInCatr, setIsinCart] = useState(false);

  const favoritesArray = useAppSelector(state => state.chosenItems.favorite);
  const cartArray = useAppSelector(state => state.chosenItems.cart);
  const itemsQuantity = useAppSelector(
    state => state.pagesDetails.itemsQuantity,
  );

  useEffect(() => {
    if (!favoritesArray.some(obj => obj.id === gadget.id)) {
      setHeartIco('./icons/heart-ico.svg');
    } else {
      setHeartIco('./icons/heart-red-ico.svg');
    }

    if (!cartArray.some(obj => obj.id === gadget.id)) {
      setIsinCart(false);
    } else {
      setIsinCart(true);
    }
  }, [favoritesArray, gadget]);

  const handleheartIco = () => {
    if (!favoritesArray.some(obj => obj.id === gadget.id)) {
      localStorage.setItem(
        'favorite',
        JSON.stringify(favoritesArray.concat(gadget)),
      );

      dispatch(addTofavorite(gadget));
    } else {
      const favString = localStorage.getItem('favorite');

      if (favString) {
        const favArray = JSON.parse(favString);

        const newFavorite = [];

        for (const obj of favArray) {
          if (obj.id !== gadget.id) {
            newFavorite.push(obj);
          }
        }

        localStorage.setItem('favorite', JSON.stringify(newFavorite));
      }

      dispatch(deleteFromfavorite(gadget));
    }
  };

  const handleAddToCart = () => {
    if (!cartArray.some(obj => obj.id === gadget.id)) {
      const newObj = { ...itemsQuantity };

      newObj[gadget.id] = 1;

      dispatch(addToItemsQuantity(gadget.id));
      dispatch(addToCart(gadget));
      localStorage.setItem('cart', JSON.stringify(cartArray.concat(gadget)));
      localStorage.setItem('itemsQuantity', JSON.stringify(newObj));

      setIsinCart(true);
    } else {
      setIsinCart(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__topBlock}>
        <img
          className={styles.card__image}
          src={gadget.image}
          alt="product picture"
        />

        <p className={styles.card__name}>{gadget.name}</p>
      </div>

      <div className={styles.card__bottomBlock}>
        <div className={styles.card__priceBlock}>
          <p className={styles.card__newPrice}>{`$${gadget.price}`}</p>
          <p className={styles.card__oldPrice}>{`$${gadget.fullPrice}`}</p>
        </div>

        <div className={styles.card__divider} />

        <div className={styles.card__infoBlock}>
          <p className={styles.card__infoTitle}>Screen</p>
          <p className={styles.card__infoValue}>{gadget.screen}</p>
        </div>

        <div className={styles.card__infoBlock}>
          <p className={styles.card__infoTitle}>Capacity</p>
          <p className={styles.card__infoValue}>{gadget.capacity}</p>
        </div>

        <div className={styles.card__infoBlock}>
          <p className={styles.card__infoTitle}>RAM</p>
          <p className={styles.card__infoValue}>{gadget.ram}</p>
        </div>

        <div className={styles.card__buttonsSection}>
          <button
            disabled={isInCatr}
            onClick={handleAddToCart}
            className={`${styles.blackButtonBase} ${styles.card__buttonAddToCatr} ${isInCatr && styles.added}`}
          >
            {isInCatr ? 'In your cart' : 'Add to cart'}
          </button>

          <button
            onClick={handleheartIco}
            className={styles.card__buttonAddTofavorite}
          >
            <img
              className={styles.card__buttonAddfavoriteIcon}
              src={heartIco}
              alt="add to favorites"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
