import styles from './ModalDialog.module.scss';
import close from '../../images/icons/close.svg';
import React, { useContext } from 'react';
import { CartContext } from '../../store/CartContext';

type Props = {
  showModal: boolean;
  closeModal: () => void;
};

export const ModalDialog: React.FC<Props> = ({ showModal, closeModal }) => {
  const { clearCart } = useContext(CartContext);

  if (!showModal) {
    return null;
  }

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <button className={styles.modal__close} onClick={closeModal}>
        <img src={close} alt="close" className={styles.modal__img} />
      </button>
      <div className={styles.modal__text}>
        Checkout is not implemented yet. <br /> Do you want to clear the Cart?
      </div>
      <div className={styles.modal__buttons}>
        <button className={styles.modal__button} onClick={handleConfirm}>
          Confirm
        </button>
        <button className={styles.modal__button} onClick={closeModal}>
          Calcel
        </button>
      </div>
    </div>
  );
};
