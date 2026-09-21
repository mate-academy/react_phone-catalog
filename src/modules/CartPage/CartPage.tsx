import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    changeQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice,
  } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.page}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <span className={styles.backArrow}>‹</span>
        <span>Back</span>
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.emptyContainer}>
          <img
            src="./img/cart-is-empty.png"
            alt="Cart is empty"
            className={styles.emptyImage}
          />
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <Link to="/" className={styles.shopBtn}>
            Go shopping
          </Link>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.itemsList}>
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={changeQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className={styles.checkoutBox}>
            <div className={styles.totalPrice}>${totalPrice}</div>
            <div className={styles.totalCount}>
              Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </div>

            <div className={styles.divider} />

            <button
              type="button"
              onClick={handleCheckout}
              className={styles.checkoutBtn}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
