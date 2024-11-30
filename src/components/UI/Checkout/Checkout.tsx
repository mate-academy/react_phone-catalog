import styles from './Checkout.module.scss';

type Props = {
  onClear: () => void;
};

export const Checkout: React.FC<Props> = ({ onClear }) => {
  return (
    <button className={styles.checkoutButton} onClick={onClear}>
      Checkout
    </button>
  );
};
