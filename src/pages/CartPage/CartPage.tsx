import styles from './CartPage.styles.module.scss';
import ArrowLeft from '../../assets/icons/VectorLeft.svg?react';
import { useNavigate } from 'react-router-dom';
import { CartList } from '../../modules/CartList/CartList';
import { useCart } from '../../context/CartContext';
import { CartSummary } from '../../modules/CartSummary';

export const CartPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className={styles.cartPage}>
      <button type="button" className={styles.backButton} onClick={handleBack}>
        <ArrowLeft />
        <span>Back</span>
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.emptyState}>
          <img
            src="/img/cart-is-empty.png"
            alt="Empty cart"
            className={styles.emptyImage}
          />

          <h2 className={styles.emptyTitle}>Your cart is empty</h2>

          <p className={styles.emptyText}>
            Tap “Add to cart” on any product to add it here.
          </p>
        </div>
      ) : (
        <div className={styles.content}>
          <CartList items={cart} />

          <CartSummary />
        </div>
      )}
    </section>
  );
};
