import React, { useState } from 'react';
import styles from './ShoppingCart.module.scss';
import { useAppSelector } from '../../../../app/hooks';
import { CartItem } from '../CartItem';
import { CheckoutPopUp } from '../CheckoutPopUp';

export const ShoppingCart: React.FC = () => {
  const { cart } = useAppSelector(state => state.cart);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const totalAmount = cart.reduce(
    (prev, item) => prev + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((prev, item) => prev + item.quantity, 0);

  return (
    <div
      className={`page__shopping-cart ${styles['shopping-cart']}`}
      style={{ overflow: popupIsOpen ? 'hidden' : '' }}
    >
      <div className={styles['shopping-cart__container']}>
        <h2 className={`${styles['shopping-cart__title']} main-title`}>Cart</h2>

        {!cart.length && (
          <div className={styles['shopping-cart__is-empty']}>
            <img src="./img/cart-is-empty.png" alt="Empty" />
          </div>
        )}

        {cart.length > 0 && (
          <div className={styles['shopping-cart__row']}>
            <div className={styles['shopping-cart__products']}>
              {[...cart].reverse().map(c => (
                <CartItem product={c} key={c.itemId} />
              ))}
            </div>

            <div className={styles['shopping-cart__check']}>
              <div className={styles['shopping-cart__total']}>
                ${totalAmount}
              </div>
              <p className={styles['shopping-cart__items']}>
                Total for {totalItems} items
              </p>
              <button
                className={styles['shopping-cart__checkout']}
                onClick={() => setPopupIsOpen(curr => !curr)}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <CheckoutPopUp onToggle={setPopupIsOpen} isOpen={popupIsOpen} />
    </div>
  );
};
