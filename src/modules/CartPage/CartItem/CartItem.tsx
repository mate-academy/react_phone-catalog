import { useDispatch } from 'react-redux';
import { Product } from '../../../types/Product';
import styles from './CartItem.module.scss';
import React, { useEffect, useState } from 'react';
import { setDeleteFromCart } from '../../../features/chosenItemsSlice';
import {
  addToCartNumberOfItems,
  deleteFromCartNumberOfItems,
  minusFromCartNumberOfItems,
} from '../../../features/pagesDetailsSlice';
import { useAppSelector } from '../../../app/hooks';

interface CatrItemType {
  gadget: Product;
}

export const CartItem: React.FC<CatrItemType> = ({ gadget }) => {
  const dispatch = useDispatch();

  const [isMinusDisabled, setIsMinusDisabled] = useState(false);

  const numberOfItems = useAppSelector(
    state => state.pagesDetails.cartNumberOfItems[gadget.id],
  );

  useEffect(() => {
    if (numberOfItems <= 1) {
      setIsMinusDisabled(true);
    } else {
      setIsMinusDisabled(false);
    }
  }, [numberOfItems]);

  const cartNumberOfItems = useAppSelector(
    state => state.pagesDetails.cartNumberOfItems,
  );

  const handleDeleteButton = () => {
    dispatch(setDeleteFromCart(gadget));
    dispatch(deleteFromCartNumberOfItems(gadget.id));

    const newObj = { ...cartNumberOfItems };

    delete newObj[gadget.id];

    localStorage.setItem('cartNumberOfItems', JSON.stringify(newObj));

    const cartString = localStorage.getItem('cart');

    if (cartString) {
      const cartArr = JSON.parse(cartString);

      const newCart: Product[] = [];

      for (const obj of cartArr) {
        if (obj.id !== gadget.id) {
          newCart.push(obj);
        }
      }

      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const handleMinusItem = () => {
    dispatch(minusFromCartNumberOfItems(gadget.id));
  };

  const handlePlusItem = () => {
    dispatch(addToCartNumberOfItems(gadget.id));
  };

  return (
    <div className={styles.item}>
      <div className={styles.item__left}>
        <img
          onClick={handleDeleteButton}
          className={styles.item__deleteButton}
          src="/icons/close-light-ico.svg"
          alt="delet-ico"
        />
        <img
          className={styles.item__image}
          src={gadget.image}
          alt="product-photo"
        />
        <p className={styles.item__name}>{gadget.name}</p>
      </div>

      <div className={styles.item__right}>
        <div className={styles.quantity}>
          <button
            onClick={handleMinusItem}
            className={`${styles.quantity__button} ${isMinusDisabled && styles.disabledButton}`}
          >
            <img src="/icons/minus-ico.svg" alt="minus-ico" />
          </button>

          <p className={styles.quantity__number}>{numberOfItems}</p>

          <button onClick={handlePlusItem} className={styles.quantity__button}>
            <img src="/icons/plus-ico.svg" alt="plus-ico" />
          </button>
        </div>

        <h3 className={styles.item__price}>$999</h3>
      </div>
    </div>
  );
};
