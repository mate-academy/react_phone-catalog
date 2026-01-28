import React from 'react';
import styles from './ModalDialog.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { cartProductsSlice } from '../../features/cartProducts';

type Props = {
  closeModal: () => void;
};

export const ModalDialog: React.FC<Props> = ({ closeModal }) => {
  const dispatch = useAppDispatch();

  const handleCartClear = () => {
    dispatch(cartProductsSlice.actions.clearCart());
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal_dialog}>
        <p className={styles.title}>
          Checkout is not implemented yet. <br /> Do you want to clear the Cart?
        </p>

        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleCartClear}>
            Confirm
          </button>
          <button className={styles.button} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
