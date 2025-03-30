import React, { useContext } from 'react';
import styles from './ModalDialog.module.scss';
import { CartContext } from '../../store/CartContext';
import { ThemeContext } from '../../store/ThemeContex';
import close from '../../images/icons/close.svg';
import cn from 'classnames';
import { Theme } from '../../types/Theme';

type Props = {
  showModal: boolean;
  closeModal: () => void;
};

export const ModalDialog: React.FC<Props> = ({ showModal, closeModal }) => {
  const { clearCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  if (!showModal) {
    return null;
  }

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div
      className={cn({
        [styles.modal]: theme === Theme.Light,
        [styles['modal--dark']]: theme === Theme.Dark,
      })}
    >
      <button className={styles.modal__close} onClick={closeModal}>
        <img src={close} alt="close" className={styles.modal__img} />
      </button>
      <div
        className={cn({
          [styles.modal__text]: theme === Theme.Light,
          [styles['modal__text-dark']]: theme === Theme.Dark,
        })}
      >
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
