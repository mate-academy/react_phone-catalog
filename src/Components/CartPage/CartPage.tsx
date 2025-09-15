import React from 'react';
import styles from './Cart.module.scss';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../CartItem';
import { useLocation, useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { state } = useLocation();

  const totalItems = cart.length;
  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

  if (cart.length === 0) {
    return (
      <div className={styles.wrapper}>
        <img
          src="/img/product-not-found.png"
          alt="Not found"
          className={styles.pulseImage}
        />
        <p className={styles.text}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div
        className={styles.backButton}
        onClick={() => navigate(state?.pathname || '/')}
      >
        <div className={styles.img}></div> Back
      </div>
      <h1 className={styles.title}>Cart</h1>
      <div className={styles.content}>
        <div className={styles.list}>
          {cart.map(product => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>

        <div className={styles.summary}>
          <h2 className={styles.totalPrice}>${totalPrice}</h2>
          <p className={styles.totalItems}>
            Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
          <hr className={styles.divider} />
          <button className={styles.checkoutBtn}>Checkout</button>
        </div>
      </div>
    </div>
  );
};
