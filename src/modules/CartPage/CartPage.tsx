import { useState } from 'react';
import { BackButton } from '../shared/components/BackButton';
import { useCart } from '../shared/context/CartContext';
import { pluralize } from '../shared/utils/pluralize';
import { CartItem } from './components/CartItem';
import { CheckoutModal } from './components/CheckoutModal';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { items, totalQuantity, totalPrice, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleConfirm = () => {
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div className={styles.page}>
      <BackButton className={styles.back} />

      <h1 className={styles.title}>Cart</h1>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <img
            src="img/cart-is-empty.png"
            alt=""
            className={styles.emptyImage}
          />

          <p className={styles.emptyText}>Your cart is empty</p>
        </div>
      ) : (
        <div className={styles.content}>
          <ul className={styles.list}>
            {items.map(item => (
              <li key={item.id}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>

          <section className={styles.summary} aria-label="Order summary">
            <p className={styles.total}>${totalPrice}</p>

            <p className={styles.totalLabel}>
              Total for {pluralize(totalQuantity, 'item')}
            </p>

            <button
              type="button"
              className={styles.checkout}
              onClick={() => setIsCheckoutOpen(true)}
            >
              Checkout
            </button>
          </section>
        </div>
      )}

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};
