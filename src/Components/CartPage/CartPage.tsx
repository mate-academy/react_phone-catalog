import React, { useState } from 'react';
import styles from './Cart.module.scss';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../CartItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../Loader';

export const CartPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { state } = useLocation();

  const totalItems = cart.reduce(
    (acc, product) => acc + (product.count || 1),
    0,
  );
  const totalPrice = cart.reduce(
    (acc, product) => acc + (Number(product.price) || 0) * (product.count || 1),
    0,
  );

  const handleCheckout = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsMenuOpen(true);

      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 3000);
    }, 1000);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (cart.length === 0) {
    return (
      <div className={styles.wrapper}>
        <img
          src="./img/product-not-found.png"
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
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
      <aside className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.menu__content}>
          <div className={styles.menu__topImg}></div>
          <h1 className={styles.menu__topTitle}>Success</h1>
          <div className={styles.menu__top}>Thank you for purchasing</div>
        </div>
      </aside>
    </div>
  );
};
