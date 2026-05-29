import React, { useContext } from 'react';
import styles from './CartPage.module.scss';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { CartItem } from '../shared/components';
import { Errors } from '../shared/components/Errors/Errors';

export const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  const countProducts = cartItems.length;

  const totalPrice = cartItems.reduce(
    (acc, { product, quantityCarts }) => acc + product.price * quantityCarts,
    0,
  );

  return (
    <article className={styles.cartpage}>
      <div className={styles.breadcrumb}>
        <Link to="/">
          <img
            className={styles.breadcrumb_icon}
            src="/img/icons/Chevron_(Arrow_Left).svg"
            alt="back"
          />
        </Link>
        <Link className={styles.breadcrumb_page} to="/">
          <p>Back</p>
        </Link>
      </div>
      <p className={styles.title}>Cart</p>
      <main className={styles.main}>
        <div className={styles.products}>
          {countProducts === 0 ? (
            <Errors type="empty-cart" />
          ) : (
            cartItems.map(({ product, quantityCarts }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantityCarts}
              />
            ))
          )}
        </div>

        <div className={styles.total}>
          <div className={styles.priceblock}>
            <p className={styles.totalPrice}>${totalPrice}</p>
            <p className={styles.countProducts}>
              Total for {countProducts} items
            </p>
          </div>
          <button className={styles.checkoutButton}>Checkout</button>
        </div>
      </main>
    </article>
  );
};
