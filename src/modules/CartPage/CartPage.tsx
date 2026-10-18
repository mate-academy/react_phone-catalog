import { useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { Container } from '../../components/Container';
import { useCart } from '../../context';
import { StatusMessage } from '../shared';
import { CartItem } from './components/CartItem';
import { CartSummary } from './components/CartSummary';
import styles from './CartPage.module.scss';

const CHECKOUT_MESSAGE =
  'Checkout is not implemented yet. Do you want to clear the Cart?';

export const CartPage = () => {
  const { items, totalPrice, totalQuantity, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleConfirm = () => {
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <Container>
      <BackButton />

      <h1 className={styles['cart-page__title']}>Cart</h1>

      {items.length === 0 ? (
        <StatusMessage
          text="Your cart is empty"
          image="img/cart-is-empty.png"
        />
      ) : (
        <div className={styles['cart-page__content']}>
          <ul className={styles['cart-page__list']}>
            {items.map(item => (
              <li key={item.id}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>

          <CartSummary
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            onCheckout={() => setIsCheckoutOpen(true)}
          />
        </div>
      )}

      {isCheckoutOpen && (
        <ConfirmDialog
          message={CHECKOUT_MESSAGE}
          onConfirm={handleConfirm}
          onCancel={() => setIsCheckoutOpen(false)}
        />
      )}
    </Container>
  );
};
