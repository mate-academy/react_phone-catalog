import React from 'react';
import styles from './Cart.module.scss';
import { CartItem } from '../../components/CartItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {Breadcrumbs} from "../../components/Breadcrumbs";

export const Cart: React.FC = () => {
  const allProducts = useSelector((state: RootState) => state.cart.items);

  const totalPrice = allProducts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <>
      <div className={styles.container}>
        <Breadcrumbs/>
        <h1 className={styles.title}>Cart</h1>

        <div className={styles.main}>
          <div className={styles['cart-items']}>
            {allProducts.map(p => (
              <CartItem product={p} key={p.itemId} />
            ))}
          </div>
          <div className={styles['total-wrapper']}>
            <h2 className={styles['total-price']}>${totalPrice}</h2>
            <p className={styles['total-items']}>
              Total items: {allProducts.length}
            </p>

            <button className={styles.checkout}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};
