import React from 'react';

import styles from './Dialog.module.scss';

import { useAppDispatch } from '../../../../store/hooks';
import { clearCart } from '../../../../store/cartSlice/cartSlice';

type Props = {
  setIsModalOpen: (value: boolean) => void;
};

export const Dialog: React.FC<Props> = ({ setIsModalOpen }) => {
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    dispatch(clearCart());
    setIsModalOpen(false);
  };

  return (
    <div className={styles.cartDialog}>
      <dialog className={styles.cartDialog__dialog}>
        <p className={styles.cartDialog__text}>
          Checkout is not implemented yet.
          <br />
          Do you want to clear the Cart?
        </p>
        <div>
          <button className={styles.cartDialog__btn} onClick={handleConfirm}>
            Yes
          </button>
          <button
            className={styles.cartDialog__btn}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};
