import { Button } from '../../../shared/components/Button';
import { useCart } from '../../../shared/context/CartContext';
import styles from './CartSummary.module.scss';

export function CartSummary(): JSX.Element {
  const { totalQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = (): void => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <aside className={styles.summary} aria-labelledby="summary-title">
      <div className={styles.total}>
        <h2 id="summary-title" className={styles.totalLabel}>
          Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
        </h2>
        <div className={styles.totalPrice}>${totalPrice}</div>
      </div>
      <hr className={styles.divider} />
      <Button
        className={styles.checkoutButton}
        variant="primary"
        onClick={handleCheckout}
        type="button"
      >
        Checkout
      </Button>
    </aside>
  );
}
