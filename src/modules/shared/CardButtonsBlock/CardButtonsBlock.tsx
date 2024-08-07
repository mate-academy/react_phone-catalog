import React from 'react';
import styles from './CardButtonsBlock.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  addToCart,
  addTofavorite,
  deleteFromfavorite,
} from '../../../features/chosenItemsSlice';
import { addToItemsQuantity } from '../../../features/pagesDetailsSlice';
import { Product } from '../../../types/Product';

type Props = {
  gadg: Product | null;
  favIco: string;
  isInBasket: boolean;
  setIsInBasket: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CardButtonsBlock: React.FC<Props> = ({
  gadg,
  favIco,
  isInBasket,
  setIsInBasket,
}) => {
  const dispatch = useAppDispatch();

  const favoritesArray = useAppSelector(state => state.chosenItems.favorite);
  const cartArray = useAppSelector(state => state.chosenItems.cart);
  const itemsQuantity = useAppSelector(
    state => state.pagesDetails.itemsQuantity,
  );

  const handleheartIco = () => {
    if (gadg !== null) {
      if (!favoritesArray.some(obj => obj.id === gadg.id)) {
        localStorage.setItem(
          'favorite',
          JSON.stringify(favoritesArray.concat(gadg)),
        );

        dispatch(addTofavorite(gadg));
      } else {
        const favString = localStorage.getItem('favorite');

        if (favString) {
          const favArray = JSON.parse(favString);

          const newFavorite = [];

          for (const obj of favArray) {
            if (obj.id !== gadg.id) {
              newFavorite.push(obj);
            }
          }

          localStorage.setItem('favorite', JSON.stringify(newFavorite));
        }

        dispatch(deleteFromfavorite(gadg));
      }
    }
  };

  const handleAddToCart = () => {
    if (gadg !== null) {
      if (!cartArray.some(obj => obj.id === gadg.id)) {
        const newObj = { ...itemsQuantity };

        newObj[gadg.id] = 1;

        dispatch(addToItemsQuantity(gadg.id));
        dispatch(addToCart(gadg));
        localStorage.setItem('cart', JSON.stringify(cartArray.concat(gadg)));
        localStorage.setItem('itemsQuantity', JSON.stringify(newObj));

        setIsInBasket(true);
      } else {
        setIsInBasket(false);
      }
    }
  };

  return (
    <div className={styles.buttonsSection}>
      <button
        disabled={isInBasket}
        onClick={handleAddToCart}
        className={`${styles.blackButtonBase} ${styles.buttonAddToCatr} ${isInBasket && styles.added}`}
      >
        {isInBasket ? 'In your cart' : 'Add to cart'}
      </button>

      <button onClick={handleheartIco} className={styles.buttonAddTofavorite}>
        <img
          className={styles.buttonAddfavoriteIcon}
          src={favIco}
          alt="add to favorites"
        />
      </button>
    </div>
  );
};
