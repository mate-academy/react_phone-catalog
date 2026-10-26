import { useEffect, useState } from 'react';
import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
import { useStoreContext } from 'src/context/StoreContext';
import styles from './Modal.module.scss';

export const Modal = () => {
  const { cartDispatch } = useStoreContext();
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  const confirm = () => {
    cartDispatch({ type: 'CLEAR_CART' });
    close();
  };

  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', closeOnEsc);

    return () => document.removeEventListener('keydown', closeOnEsc);
  }, []);

  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Checkout</PrimaryButton>

      {isOpen && (
        <div className={styles.overlay} onClick={close}>
          <div
            className={styles.modal}
            onClick={event => event.stopPropagation()}
          >
            <p>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>

            <div className={styles.actions}>
              <PrimaryButton onClick={confirm}>Confirm</PrimaryButton>
              <PrimaryButton onClick={close}>Cancel</PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
