import React from 'react';
import { CartRecord } from '../../shared/components/CartItem/CartRecord';
import { CartItem } from '../../shared/contexts/CartContext';
import styles from './CartPage.module.scss';
// eslint-disable-next-line max-len
import { NavigationButton } from '../../shared/components/NavigationButton/NavigationButton';

const demoItem: CartItem = {
  id: 1,
  name: 'Demo iPhone',
  image: '/img/phones/apple-iphone-14-pro.webp',
  price: 999,
  quantity: 1,
  capacity: '128GB',
  color: 'Silver',
};

export const CartPage: React.FC = () => {
  return (
    <div className={styles.lid}>
      <NavigationButton title={'Back'} />
      <h1>Cart</h1>
      <section>
        <div className={styles.container}>
          <div className={styles.cartList}>
            <CartRecord
              item={demoItem}
              onIncrement={() => {}}
              onDecrement={() => {}}
              onRemove={() => {}}
            />
            <CartRecord
              item={demoItem}
              onIncrement={() => {}}
              onDecrement={() => {}}
              onRemove={() => {}}
            />
            <CartRecord
              item={demoItem}
              onIncrement={() => {}}
              onDecrement={() => {}}
              onRemove={() => {}}
            />
          </div>
          <div>
            <aside className={styles.summary}>
              <p className={styles.totalPrice}>totalPrice</p>
              <p className={styles.totalText}>Total for</p>

              <hr className={styles.divider} />

              <button className={styles.checkoutBtn}>Checkout</button>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
