import React, { useContext } from 'react';
import styles from './CartModal.module.scss';
import { DataContext } from '../../../context/DataContext';

type Props = {
  onClick: (value: boolean) => void;
};

export const CartModal: React.FC<Props> = ({ onClick }) => {
  const { setCart } = useContext(DataContext);

  return (
    <div className={styles.cartModal}>
      <p className={styles.cartModal__notification}>
        Checkout is not available yet. Do you want to clear the Cart?
      </p>
      <div className={styles.cartModal__buttons}>
        <button
          className={styles.cartModal__button_confirm}
          onClick={() => {
            onClick(false);
            setCart([]);
          }}
        >
          Yes, I confirm
        </button>
        <button
          className={styles.cartModal__button_cancel}
          onClick={() => onClick(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
