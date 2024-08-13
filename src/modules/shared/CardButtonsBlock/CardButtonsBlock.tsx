import React, { useEffect, useState } from 'react';
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
};

export const CardButtonsBlock: React.FC<Props> = ({ gadg }) => {
  const dispatch = useAppDispatch();
  const [heartIco, setHeartIco] = useState('');
  const [isInCatr, setIsinCart] = useState(false);

  const favoritesArray = useAppSelector(state => state.chosenItems.favorite);
  const cartArray = useAppSelector(state => state.chosenItems.cart);
  const itemsQuantity = useAppSelector(
    state => state.pagesDetails.itemsQuantity,
  );
  const isDark = useAppSelector(state => state.boolean.isDark);

  useEffect(() => {
    if (gadg !== null && isDark) {
      if (!favoritesArray.some(obj => obj.id === gadg.id)) {
        setHeartIco('./icons/dark-theme-icons/heart-ico.svg');
      } else {
        setHeartIco('./icons/heart-red-ico.svg');
      }

      if (!cartArray.some(obj => obj.id === gadg.id)) {
        setIsinCart(false);
      } else {
        setIsinCart(true);
      }
    }

    if (gadg !== null && !isDark) {
      if (!favoritesArray.some(obj => obj.id === gadg.id)) {
        setHeartIco('./icons/heart-ico.svg');
      } else {
        setHeartIco('./icons/heart-red-ico.svg');
      }

      if (!cartArray.some(obj => obj.id === gadg.id)) {
        setIsinCart(false);
      } else {
        setIsinCart(true);
      }
    }
  }, [favoritesArray, gadg, isDark, cartArray]);

  useEffect(() => {
    const cartButtonsBlock = document.getElementsByClassName(
      styles.buttonsSection,
    );

    for (let i = 0; i < cartButtonsBlock.length; i++) {
      const element = cartButtonsBlock[i] as HTMLElement;

      if (isDark) {
        element.style.setProperty('--primary-grey-color', '#905bff');
        element.style.setProperty('--white-color', '#323542');
        element.style.setProperty('--elements-grey-color', '#323542');
        element.style.setProperty('--icons-grey-color', '#323542');
      } else {
        element.style.setProperty('--primary-grey-color', '#313237');
        element.style.setProperty('--white-color', '#ffffff');
        element.style.setProperty('--elements-grey-color', '#e2e6e9');
        element.style.setProperty('--icons-grey-color', '#b4bdc4');
      }
    }
  }, [isDark, favoritesArray]);

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

        setIsinCart(true);
      } else {
        setIsinCart(false);
      }
    }
  };

  return (
    <div className={styles.buttonsSection}>
      <button
        disabled={isInCatr}
        onClick={handleAddToCart}
        className={`
          ${styles.blackButtonBase}
          ${styles.buttonAddToCatr}
          ${isInCatr && styles.added}
          ${isDark && styles.addToCartDark} `}
      >
        {isInCatr ? 'Added' : 'Add to cart'}
      </button>

      <button
        onClick={handleheartIco}
        className={`
          ${styles.buttonAddTofavorite}
          ${isDark && styles.addToFavouriteDark}
          ${heartIco === './icons/heart-red-ico.svg' && isDark && styles.favourite}`}
      >
        <img src={heartIco} alt="add to favorites" />
      </button>
    </div>
  );
};
