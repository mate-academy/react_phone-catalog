import React from 'react';
import classNames from 'classnames';

import styles from './CheckoutModal.module.scss';

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const CheckoutModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={event => event.stopPropagation()}>
        <p className={styles.modal__text}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>

        <div className={styles.modal__buttons}>
          <button
            className={classNames(
              styles.modal__button,
              styles['modal__button--confirm'],
            )}
            onClick={onConfirm}
          >
            Confirm
          </button>

          <button
            className={classNames(
              styles.modal__button,
              styles['modal__button--cancel'],
            )}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
