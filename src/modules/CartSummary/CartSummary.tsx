import { useCart } from '../../context/CartContext';
import styles from './CartSummary.styles.module.scss';

export const CartSummary = () => {
  const { cart, clearCart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <article className={styles.cartSummary}>
      <div className={styles.price}>
        <span className={styles.totalPrice}>${totalPrice}</span>
        <span className={styles.quantityItems}>
          Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className={styles.bottom}>
        <button
          type="button"
          className={styles.checkoutButton}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </article>
  );
};
