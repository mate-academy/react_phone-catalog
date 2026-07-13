import { useCart } from '../../context/CartContext';
import styles from './CartSummary.styles.module.scss';

export const CartSummary = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

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
          onClick={() => {}}
        >
          Checkout
        </button>
      </div>
    </article>
  );
};
