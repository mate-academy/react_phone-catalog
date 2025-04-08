import classNames from 'classnames';
import { UseHooks } from '../../AppHooks';
import styles from './Modal.module.scss';

export const Modal = () => {
  const { openModal, setOpenModal, setCartItems } = UseHooks();

  const closeModal = () => {
    setOpenModal(false);
  };

  const clearCart = () => {
    setCartItems([]);
    setOpenModal(false);
  };

  if (!openModal) {
    return null;
  }

  return (
    <div
      className={classNames(styles.modal, {
        [styles['modal--open']]: openModal,
      })}
    >
      <p className={styles.modal__message}>
        Checkout is not implemented yet. Do you want to clear the Cart?
      </p>
      <div className={styles.modal__actions}>
        <button
          className={(styles.modal__button, styles['modal__button--cancel'])}
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className={(styles.modal__button, styles['modal__button--clear'])}
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};
