import { Button } from '../../../../components/Button/Button';
import styles from './Checkout.module.scss';

type Props = {
  total: number;
  quantity: number;
};

export const Checkout: React.FC<Props> = ({ total, quantity }) => {
  return (
    <div className={styles.checkout}>
      <h2 className={styles.checkout__total}>${total}</h2>
      <p className={styles.checkout__description}>
        Total for {quantity} item(s)
      </p>
      <Button
        textContent="Checkout"
        className={['button', 'checkoutButton']}
        onClick={() => {}}
      />
    </div>
  );
};
