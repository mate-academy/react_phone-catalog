import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext/CartContext';
import { CartItem } from '../../components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Обчислення загальної суми та кількості всіх одиниць товарів
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
    setTimeout(() => {
      clearCart();
      setIsCheckoutModalOpen(false);
    }, 2000);
  };

  return (
    <main className={`container ${styles.pageWrapper}`}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backBtn}
      >
        &lt; Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>Your cart is empty</p>
        </div>
      ) : (
        <div className="mainGrid">
          {/* Список товарів (16 колонок з 24) */}
          <div className={styles.cartList}>
            {cart.map(item => (
              <CartItem
                key={item.product.itemId || item.product.id}
                item={item}
              />
            ))}
          </div>

          {/* Плашка підсумку Checkout (8 колонок з 24) */}
          <div className={styles.checkoutBlock}>
            <div className={styles.summary}>
              <div className={styles.totalPrice}>${totalPrice}</div>
              <div className={styles.totalCount}>
                Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
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
        </div>
      )}

      {/* Повідомлення про оформлення замовлення */}
      {isCheckoutModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>
              We are sorry, checkout is not implemented yet. Clearing cart...
            </p>
          </div>
        </div>
      )}
    </main>
  );
};
