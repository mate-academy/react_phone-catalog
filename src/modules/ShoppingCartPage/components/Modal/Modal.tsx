import React, { memo, useEffect } from 'react';
import modalStyles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { TextButton } from '../../../../components/TextButton';

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const Modal: React.FC<Props> = memo(({ onCancel, onConfirm }) => {
  useEffect(() => {
    const originalStyles = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyles;
    };
  }, []);

  return createPortal(
    <div className={modalStyles.backdrop}>
      <div className={modalStyles.modal} role="dialog" aria-modal>
        <h2 className={modalStyles.modal__title}>
          Checkout is not implemented yet
        </h2>
        <p className={modalStyles.modal__subtitle}>
          Are you sure you want to clear the cart?
        </p>
        <div className={modalStyles.modal__actions}>
          <TextButton className={modalStyles.modal__button} onClick={onConfirm}>
            Confirm
          </TextButton>
          <TextButton
            theme="light"
            className={modalStyles.modal__button}
            onClick={onCancel}
          >
            Cancel
          </TextButton>
        </div>
      </div>
    </div>,
    document.body,
  );
});

Modal.displayName = 'Modal';
