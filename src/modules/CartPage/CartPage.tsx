import React, { useContext, useState } from 'react';
import styles from './CartPage.module.scss';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { CartItem } from '../shared/components';
import { Errors } from '../shared/components/Errors/Errors';

export const CartPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const countProducts = cartItems.reduce(
    (acc, { quantityCarts }) => acc + quantityCarts,
    0,
  );

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
            src="img/icons/Chevron_(Arrow_Left).svg"
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
          <button
            className={styles.checkoutButton}
            onClick={() => setIsModalOpen(true)}
            disabled={countProducts === 0}
          >
            Checkout
          </button>
        </div>
      </main>
      {isModalOpen && (
        <div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>🎉 Order confirmed!</h3>
            <p>Thank you for your purchase!</p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                clearCart();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </article>
  );
};
