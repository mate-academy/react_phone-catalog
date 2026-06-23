/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../../../../hooks/useCart';
import { CloseIcon } from '../../../../components/Icons/CloseIcon';

import styles from './CartModuleWindow.module.scss';

type Props = {
  isShowing: boolean;
  changeShowing: (value: boolean) => void;
};

export const CartModuleWindow: React.FC<Props> = ({
  isShowing,
  changeShowing,
}) => {
  const [isApprove, setIsApprove] = useState(false);

  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleConfirm = () => {
    setIsApprove(true);

    setTimeout(() => {
      clearCart();
      changeShowing(false);

      window.scrollTo(0, 0);

      navigate('/');
    }, 2000);
  };

  if (!isShowing) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={() => changeShowing(false)}>
      <div className={styles.window} onClick={e => e.stopPropagation()}>
        <div className={styles.topBar}>
          <h2>Checkout</h2>

          <button
            className={styles.closeBtn}
            onClick={() => changeShowing(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <p className={styles.text}>
          {isApprove
            ? 'Success! Your order has been placed. Redirecting to home...'
            : 'Checkout is not implemented yet. Do you want to clear the Cart and return home?'}
        </p>

        {!isApprove && (
          <button className={styles.button} onClick={handleConfirm}>
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};
