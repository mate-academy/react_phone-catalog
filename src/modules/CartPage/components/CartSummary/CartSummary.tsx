import styles from './CartSummary.module.scss';

interface Props {
  totalPrice: number;
  totalQuantity: number;
  onCheckout: () => void;
}

export const CartSummary = ({
  totalPrice,
  totalQuantity,
  onCheckout,
}: Props) => (
  <section className={styles.summary} aria-label="Order summary">
    <div className={styles.total}>
      <p className={styles.price}>${totalPrice}</p>
      <p className={styles.caption}>
        Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
      </p>
    </div>

    <button type="button" className={styles.checkout} onClick={onCheckout}>
      Checkout
    </button>
  </section>
);
