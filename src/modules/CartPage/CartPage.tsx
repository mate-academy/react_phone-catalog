import { useState } from 'react';
import { BackButton } from '../shared/components/BackButton';
import { ConfirmModal } from '../shared/components/ConfirmModal';
import { Container } from '../shared/components/Container';
import { useCart } from '../shared/context/CartContext';
import { CartItem } from './components/CartItem';
import { CartSummary } from './components/CartSummary';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { items, totalPrice, totalQuantity, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleConfirm = () => {
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <Container className={styles.page}>
      <BackButton />
      <h1 className={styles.title}>Cart</h1>

      {items.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <div className={styles.layout}>
          <ul className={styles.list}>
            {items.map(item => (
              <li key={item.id}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>

          <div>
            <CartSummary
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
              onCheckout={() => setIsCheckoutOpen(true)}
            />
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={isCheckoutOpen}
        text="Checkout is not implemented yet. Do you want to clear the Cart?"
        confirmLabel="Clear the Cart"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setIsCheckoutOpen(false)}
      />
    </Container>
  );
};
