import React from 'react';
import styles from './CartPage.module.scss';
import { useAppContext } from '../../contexts/AppContext';
import { CartProduct } from './CartProduct';
import { getCardById } from '../shared/services/productService';
import { Card } from '../../types/Card';

export const CartPage: React.FC = () => {
  const { cartProductsIds } = useAppContext();

  return (
    <main className={styles.main}>
      {cartProductsIds.length > 0 && (
        <>
          <h1 className={styles.title}>Cart</h1>

          <div className={styles.content}>
            <div className={styles.products}>
              {cartProductsIds.map(id => (
                <CartProduct product={getCardById(id) as Card} />
              ))}
            </div>

            <div className={styles.checkout}>
              <div className={styles.content}>
                <h2>$</h2>
                <span>Total for {} items</span>
              </div>
              <div className={styles.line}></div>

              <button className={styles.button}>Checkout</button>
            </div>
          </div>
        </>
      )}

      {cartProductsIds.length === 0 && (
        <img src="/img/cart-is-empty.png" alt="Cart is empty" />
      )}
    </main>
  );
};
