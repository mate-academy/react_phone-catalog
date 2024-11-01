import React from 'react';
import styles from './cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { addCase, decreaseCase, deleteCarts } from '../../features/cart';
import classNames from 'classnames';

export const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cart.items);

  const deleteCartItem = (itemId: string | number) => {
    dispatch(deleteCarts(itemId));
  };

  const handleIncreaseQuantity = (itemId: string | number) => {
    dispatch(addCase(itemId));
  };

  const handleDecreaseQuantity = (itemId: string | number) => {
    dispatch(decreaseCase(itemId));
  };

  return (
    <section className={classNames(styles.cart, 'contasiner')}>
      <h1>Cart</h1>
      <ul className={styles.cart_list}>
        {cartItem.map(cart => (
          <li key={cart.id} className={styles.cart_item}>
            <div className={styles.cart_container1}>
              <span
                className={styles.cart_delete}
                onClick={() => deleteCartItem(cart.id)}
              ></span>
              <img
                src={cart.image}
                alt={cart.name}
                className={styles.cart_img}
              />
              <p>{cart.name}</p>
            </div>
            <div className={styles.cart_container2}>
              <button
                disabled={cart.quantity === 1}
                onClick={() => handleDecreaseQuantity(cart.id)}
              >
                Меньше
              </button>
              <span>{cart.quantity}</span>
              <button onClick={() => handleIncreaseQuantity(cart.id)}>
                Больше
              </button>
              <p>${cart.price * cart.quantity}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.cart_shop}>
        <p className={styles.cart_shop_price}>
          $
          {cartItem.reduce(
            (totalSum, item) => totalSum + item.quantity * item.price,
            0,
          )}
        </p>
        <p>
          {`Total for   ${cartItem.reduce((totalSum, item) => totalSum + item.quantity, 0)} items`}
        </p>
        <button>ChecOut</button>
      </div>
    </section>
  );
};
