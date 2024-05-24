import React from 'react';
import styles from './CartPage.module.scss';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { getChevronIconSrc } from '../../servises/iconSrc';
import { useTheme } from '../../context/ThemeContext';
import { CartItem } from './CartItem';

const CartPage: React.FC = () => {
  const { cart, calculateTotalPrice, clearCart } = useAppContext();
  const totalItems = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  const { theme } = useTheme();
  const navigate = useNavigate();
  const chevronIconSrc = getChevronIconSrc(theme);

  const handleCheckout = () => {
    const confirmClear = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmClear) {
      clearCart();
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.topContainer}>
        <div className={styles.topLeft}>
          <button onClick={() => navigate(-1)} className={styles.goBackButton}>
            <img
              src={chevronIconSrc}
              alt="home"
              className={styles.chevronIcon}
            />
            <div className={styles.goBackText}>
              <p>Back</p>
            </div>
          </button>
        </div>
        <h1 className={styles.title}>Cart</h1>
      </div>
      {cart.length === 0 ? (
        <div className={styles.emptyContainer}>
          <h3>Your cart is empty.</h3>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.cartItems}>
            {cart.map(cartItem => (
              <CartItem key={cartItem.product.id} item={cartItem} />
            ))}
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.checkout}>
              <h2 className={styles.totalPrice}>${calculateTotalPrice()}</h2>
              <p
                className={styles.totalItems}
              >{`Total for ${totalItems} item${totalItems > 1 ? 's' : ''}`}</p>
              <div className={styles.divider}></div>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
