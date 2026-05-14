import React from 'react';
import s from './CheckoutModal.module.scss';

type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const CheckoutModal: React.FC<Props> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={s.modalOverlay} onClick={onCancel}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <h2 className={s.modal__title}>Checkout is not implemented yet</h2>

        <p className={s.modal__text}>Do you want to clear the Cart?</p>

        <div className={s.modal__actions}>
          <button
            className={`${s.modal__button} ${s.modal__buttonCancel}`}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className={`${s.modal__button} ${s.modal__buttonConfirm}`}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
