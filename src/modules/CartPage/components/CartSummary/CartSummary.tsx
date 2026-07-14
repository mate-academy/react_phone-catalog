import { SquareButton } from '../../../shared/components/SquareButton';
import styles from './CartSummary.module.scss';

interface Props {
  totalPrice: number;
  quantity: number;
  handleCheckout: () => void;
}

export const CartSummary: React.FC<Props> = ({
  totalPrice,
  quantity,
  handleCheckout,
}) => {
  return (
    <div className={styles['cart-summary']}>
      <div className={styles['cart-summary__header']}>
        <span className={styles['cart-summary__price']}>${totalPrice}</span>
        <span className={styles['cart-summary__text']}>
          Total for
          {quantity > 1 ? ` ${quantity} items` : ` ${quantity} item`}
        </span>
      </div>

      <SquareButton
        className={styles['cart-summary__button']}
        onClick={handleCheckout}
      >
        Checkout
      </SquareButton>
    </div>
  );
};
