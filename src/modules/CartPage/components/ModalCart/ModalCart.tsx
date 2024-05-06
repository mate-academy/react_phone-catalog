import React from 'react';
import { AccentBtn } from '../../../../components/AccentBtn';
import styles from './ModalCart.module.scss';
import { icons } from '../../../../shared/global/Icons';
import { clearCart } from '../../../../features/cartSlice';
import { useAppDispatch } from '../../../../app/hook';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalCart: React.FC<Props> = ({ setShowModal }) => {
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
    setShowModal(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <button
          className={styles.modalCancelBtn}
          onClick={() => setShowModal(false)}
        >
          {icons.close}
        </button>
        <h5>
          Checkout is not implemented yet. <br />
          Do you want to clear the Cart?
        </h5>
        <div className={styles.modalClearBtn}>
          <AccentBtn text="Clear Cart" onClick={handleClearCart} />
        </div>
      </div>
    </div>
  );
};
