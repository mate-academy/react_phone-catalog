import React, { useEffect } from 'react';

import styles from './ModalCheckout.module.scss';
import { AppButton } from '../../../shared/components/appButton';
import { useAppDispatch } from '../../../../app/hooks';
import { clearCart } from '../../../../features/cartSlice/cart';

type Props = {
  closeModal: () => void;
};

export const ModalCheckout: React.FC<Props> = ({ closeModal }) => {
  const dispatch = useAppDispatch();

  const clear = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    const body = document.querySelector('body');

    if (!body) {
      return;
    }

    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = '';
    };
  }, []);

  return (
    <div className={styles.background}>
      <article className={styles.modal}>
        <h3 className={styles.title}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </h3>
        <div className={styles.buttons}>
          <AppButton
            className={styles.clear}
            buttonName="Clear"
            onClick={clear}
          />
          <AppButton
            className={styles.close}
            buttonName="Close"
            onClick={closeModal}
          />
        </div>
      </article>
    </div>
  );
};
