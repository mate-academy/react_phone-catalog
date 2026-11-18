import { useState } from 'react';
import { useCart } from '../../hooks/useCartContext';
import { useStateContext } from '../../hooks/useStateContext';

import styles from './Modal.module.scss';

export const Modal = () => {
  const { dispatch } = useCart();
  const { setIsOpenModal } = useStateContext();
  const [isClosing, setIsClosing] = useState(false);

  const getTimer = () =>
    setTimeout(() => {
      setIsOpenModal(false);
    }, 400);

  const handleClose = (shouldClear = false) => {
    if (shouldClear) {
      dispatch({ type: 'clear' });
    }

    setIsClosing(true);

    getTimer();
  };

  return (
    <section
      className={`${styles.modal} ${isClosing ? styles['modal--closing'] : ''}`}
    >
      <div className={styles.modal__overlay} onClick={() => handleClose(false)}>
        <div
          className={styles.modal__content}
          onClick={event => event.stopPropagation()}
        >
          <p className={styles.modal__message}>
            Checkout is not implemented yet. Do you want to clear the Cart?
          </p>
          <button
            className={styles.modal__button}
            onClick={() => handleClose(true)}
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};
