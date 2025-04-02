import classNames from 'classnames';
import React from 'react';
import styles from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<Props> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__bg}></div>
      <div className={styles.modal__content}>
        <div className={styles.modal__text}>
          <h3 className={styles.modal__title}>
            Checkout is not implemented yet.
          </h3>
          <p className={styles.modal__body}>Do you want to clear the Cart?</p>
        </div>
        <div className={styles.modal__buttons}>
          <button
            className={classNames(
              styles.modal__button,
              styles['modal__button--confirm'],
            )}
            onClick={onConfirm}
            aria-label="confirm"
          >
            Confirm
          </button>
          <button
            className={classNames(
              styles.modal__button,
              styles['modal__button--cancel'],
            )}
            onClick={onCancel}
            aria-label="cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
