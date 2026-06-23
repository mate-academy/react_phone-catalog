import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { CartItem } from '../../components/CartItem';
import { useStore } from '../../context';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useStore();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        {'<'} Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.emptyState}>
          <img
            src="img/cart-is-empty.png"
            alt="Cart is empty"
            className={styles.emptyImage}
          />
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyText}>But you can fix it right now!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.itemsList}>
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />
            ))}
          </div>

          <div className={styles.totalBox}>
            <h2 className={styles.totalPrice}>${totalAmount}</h2>
            <p className={styles.totalLabel}>Total for {totalCount} items</p>

            <div className={styles.divider}></div>

            <button
              className={styles.checkoutBtn}
              onClick={() => window.confirm('Checkout is not implemented yet')}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
