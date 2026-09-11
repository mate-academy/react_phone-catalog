import { useContext } from 'react';
import { CartItem } from '../../components/CartItem';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { CartContext } from '../../context/CartContext';

import styles from './ShoppingCard.module.scss';
import { useNavigate } from 'react-router-dom';

export const ShoppingCard = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('ShoppingCard must be used inside CartProvider');
  }

  const { cartItems, setCartItems } = context;

  const navigate = useNavigate();

  let totalPrice = 0;

  cartItems.map(item => {
    totalPrice += item.product.priceDiscount * item.quantity;
  });

  let totalLength = 0;

  cartItems.map(item => (totalLength += item.quantity));

  if (cartItems.length === 0) {
    return (
      <>
        <div className={styles.page}>
          <Header />

          <div className={styles.shopping}>
            <h1 className={styles.shopping__title}>Cart</h1>
            <p>Your cart is empty</p>
          </div>

          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.page}>
        <Header />
        <div className={styles.shopping}>
          <div className={styles.shopping__header}>
            <button
              onClick={() => navigate(-1)}
              className={styles.shopping__button}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={styles.shopping__backIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <p className={styles.shopping__headerText}>Back</p>
          </div>
          <h1 className={styles.shopping__title}>Cart</h1>
          <div className={styles.shopping__main}>
            <div className={styles.shopping__products}>
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className={styles.shopping__checkoutPrice}>
              <div className={styles.shopping__pricesText}>
                <p className={styles.shopping__allPrice}>${totalPrice}</p>
                <p className={styles.shopping__total}>
                  Total for {totalLength} items
                </p>
              </div>
              <button
                onClick={() => {
                  const shouldClear = confirm(
                    // eslint-disable-next-line max-len
                    'Checkout is not implemented yet. Do you want to clear the Cart?',
                  );

                  if (shouldClear) {
                    setCartItems([]);
                  }
                }}
                className={styles.shopping__buttonCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
