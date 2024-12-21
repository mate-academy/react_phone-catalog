import React from 'react';
import cn from 'classnames';
import styles from './CheckoutPopUp.module.scss';
import { useAppDispatch } from '../../../../app/hooks';
import { actions as cartActions } from '../../../../features/cart/cart';

type Props = {
  onToggle: (v: boolean) => void;
  isOpen: boolean;
};

export const CheckoutPopUp: React.FC<Props> = ({ onToggle, isOpen }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={cn(styles.overlay, {
        [styles['overlay--open']]: isOpen,
      })}
    >
      <div
        className={cn(styles['checkout-popup'], {
          [styles['checkout-popup--open']]: isOpen,
        })}
      >
        <h3 className={styles['checkout-popup__title']}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </h3>

        <button
          className={styles['checkout-popup__back']}
          onClick={() => onToggle(false)}
        >
          Go back
        </button>

        <button
          className={styles['checkout-popup__clear']}
          onClick={() => {
            onToggle(false);
            dispatch(cartActions.clear());
          }}
        >
          Clear cart
        </button>

        <button
          className={styles['checkout-popup__close']}
          onClick={() => onToggle(false)}
        >
          <img src="/img/icons/delete.svg" alt="X" />
        </button>
      </div>
    </div>
  );
};
