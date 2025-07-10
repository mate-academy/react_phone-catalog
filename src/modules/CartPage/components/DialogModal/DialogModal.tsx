import React, { useContext } from 'react';
import styles from './DialogModal.module.scss';
import { CartDispatchContext } from '../../../../shared/store/CartProvider';

type Props = {
  setIsModal: (value: boolean) => void;
};

export const DialogModal: React.FC<Props> = ({ setIsModal }) => {
  const cartDispatch = useContext(CartDispatchContext);

  const handleConfirm = () => {
    cartDispatch({ type: 'clearCart' });
    setIsModal(false);
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
            onClick={() => setIsModal(false)}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};
