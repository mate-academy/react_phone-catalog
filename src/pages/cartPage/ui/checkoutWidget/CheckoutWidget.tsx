import { useGlobalData } from '@features/index';
import styles from './checkoutWidget.module.scss';

type Props = {
  totalPrice: number | string;
  toggleModal: () => void;
};

export const CheckoutWidget = ({ totalPrice, toggleModal }: Props) => {
  const { cartAmount } = useGlobalData();

  const price = totalPrice === 0 ? 'Calculating...' : `$${totalPrice}`;

  return (
    <div
      data-checkout
      className={styles['checkout-widget']}
      role="region"
      aria-label="Order summary"
    >
      <div className={styles['checkout-summary']}>
        <strong className={styles['total-price']}>{price}</strong>
        <span
          className={styles['total-amount']}
        >{`Total for ${cartAmount} item${cartAmount > 1 ? 's' : ''}`}</span>
      </div>
      <button
        className={styles['checkout-button']}
        disabled={typeof totalPrice === 'string'}
        onClick={() => toggleModal()}
      >
        Checkout
      </button>
    </div>
  );
};
