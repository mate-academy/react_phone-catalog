import { Button } from '../../../../components/Button';
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
  <aside className={styles['cart-summary']}>
    <p className={styles['cart-summary__total']}>${totalPrice}</p>
    <p className={styles['cart-summary__text']}>
      Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
    </p>

    <Button className={styles['cart-summary__button']} onClick={onCheckout}>
      Checkout
    </Button>
  </aside>
);
