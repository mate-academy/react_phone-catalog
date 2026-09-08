import styles from './TotalPrice.module.scss';

type Props = {
  clearCart: () => void;
  totalQuantity: number;
  totalPriceOfCart: number;
};

export const TotalPrice = ({
  clearCart,
  totalQuantity,
  totalPriceOfCart,
}: Props) => {
  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    } else {
      return;
    }
  };

  return (
    <div className={styles.total}>
      <div className={styles.total__content}>
        <div className={styles.total__price}>${totalPriceOfCart}</div>
        <div className={styles.total__quantity}>
          {totalQuantity === 1
            ? 'Total for 1 item'
            : `Total for ${totalQuantity} items`}
        </div>
      </div>

      <div className={styles.total__divider}></div>

      <button className={styles.total__button} onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};
