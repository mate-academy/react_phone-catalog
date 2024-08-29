import { useDispatch } from 'react-redux';
import { Product } from '../../../types/Product';
import styles from './CartItem.module.scss';
import React, { useEffect, useState } from 'react';
import { deleteFromCart } from '../../../features/chosenItemsSlice';
import {
  plusItemsQuantity,
  deleteFromItemsQuantity,
  minusItemsQuantity,
} from '../../../features/pagesDetailsSlice';
import { useAppSelector } from '../../../app/hooks';
import { Link } from 'react-router-dom';
import { handleClickOnGadget } from './../../shared/clickOnGadget';

interface CatrItemType {
  gadget: Product;
}

export const CartItem: React.FC<CatrItemType> = ({ gadget }) => {
  const dispatch = useDispatch();

  const [isMinusDisabled, setIsMinusDisabled] = useState(false);

  const numberOfSameGadget = useAppSelector(
    state => state.pagesDetails.itemsQuantity[gadget.id],
  );
  const itemsQuantity = useAppSelector(
    state => state.pagesDetails.itemsQuantity,
  );
  const isDark = useAppSelector(state => state.boolean.isDark);

  useEffect(() => {
    if (numberOfSameGadget <= 1) {
      setIsMinusDisabled(true);
    } else {
      setIsMinusDisabled(false);
    }
  }, [numberOfSameGadget]);

  const handleDeleteButton = () => {
    dispatch(deleteFromCart(gadget));
    dispatch(deleteFromItemsQuantity(gadget.id));

    const cartString = localStorage.getItem('cart');

    if (cartString) {
      const cartArr = JSON.parse(cartString);

      const newCart = [];

      for (const obj of cartArr) {
        if (obj.id !== gadget.id) {
          newCart.push(obj);
        }
      }

      localStorage.setItem('cart', JSON.stringify(newCart));
    }

    const newObj = { ...itemsQuantity };

    delete newObj[gadget.id];

    localStorage.setItem('itemsQuantity', JSON.stringify(newObj));
  };

  const handleMinusItem = () => {
    dispatch(minusItemsQuantity(gadget.id));

    const itemsQuantityString = localStorage.getItem('itemsQuantity');

    if (itemsQuantityString) {
      const itemsQuantityObject = JSON.parse(itemsQuantityString);

      itemsQuantityObject[gadget.id] = itemsQuantityObject[gadget.id] - 1;

      localStorage.setItem(
        'itemsQuantity',
        JSON.stringify(itemsQuantityObject),
      );
    }
  };

  const handlePlusItem = () => {
    dispatch(plusItemsQuantity(gadget.id));

    const itemsQuantityString = localStorage.getItem('itemsQuantity');

    if (itemsQuantityString) {
      const itemsQuantityObject = JSON.parse(itemsQuantityString);

      itemsQuantityObject[gadget.id] = itemsQuantityObject[gadget.id] + 1;

      localStorage.setItem(
        'itemsQuantity',
        JSON.stringify(itemsQuantityObject),
      );
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.item__left}>
        {isDark ? (
          <img
            onClick={handleDeleteButton}
            className={styles.item__deleteButton}
            src="./icons/close-ico.svg"
            alt="delet-ico"
          />
        ) : (
          <img
            onClick={handleDeleteButton}
            className={styles.item__deleteButton}
            src="./icons/close-light-ico.svg"
            alt="delet-ico"
          />
        )}

        <Link
          to={`/${gadget.category}/${gadget.itemId}`}
          onClick={() => handleClickOnGadget(gadget, dispatch)}
        >
          <img
            className={styles.item__image}
            src={gadget.image}
            alt="product-photo"
          />
        </Link>

        <Link
          to={`/${gadget.category}/${gadget.itemId}`}
          className={styles.item__name}
          onClick={() => handleClickOnGadget(gadget, dispatch)}
        >
          {gadget.name}
        </Link>
      </div>

      <div className={styles.item__right}>
        <div className={styles.quantity}>
          <button
            onClick={handleMinusItem}
            className={`
              ${styles.quantity__button}
              ${isMinusDisabled && styles.disabledButton}
              ${isDark && styles.buttonDark}
              ${isDark && isMinusDisabled && styles.disabledDark}
              `}
          >
            {isDark ? (
              <img
                src="./icons/dark-theme-icons/minus-ico.svg"
                alt="plus-ico"
              />
            ) : (
              <img src="./icons/minus-ico.svg" alt="minus-ico" />
            )}
          </button>

          <p className={styles.quantity__number}>{numberOfSameGadget}</p>

          <button
            onClick={handlePlusItem}
            className={`${styles.quantity__button} ${isDark && styles.buttonDark}`}
          >
            {isDark ? (
              <img src="./icons/dark-theme-icons/plus-ico.svg" alt="plus-ico" />
            ) : (
              <img src="./icons/plus-ico.svg" alt="plus-ico" />
            )}
          </button>
        </div>

        <h3
          className={styles.item__price}
        >{`$${gadget.price * numberOfSameGadget}`}</h3>
      </div>
    </div>
  );
};
