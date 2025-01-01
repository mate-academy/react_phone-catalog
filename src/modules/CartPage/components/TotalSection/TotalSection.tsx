import React from 'react';
import styles from './TotalSection.module.scss';

type Props = {
  total: number;
  amount: number;
  setOpenModule: (isOpen: boolean) => void;
};
const TotalSection: React.FC<Props> = ({ total, amount, setOpenModule }) => {
  return (
    <div className={styles.total}>
      <h2 className={styles.total__amount}>${total}</h2>
      <p className={styles.total__text}>Total for {amount} items</p>
      <button
        onClick={() => setOpenModule(true)}
        className={styles.total__button}
      >
        Checkout
      </button>
    </div>
  );
};

export default TotalSection;
