import React from 'react';
import style from './Modal.module.scss';

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className={style.modal__overlay}>
      <div className={style.modal__content}>
        <p className={style.modal__text}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <div className={style.modal__actions}>
          <button className={style.modal__confirm} onClick={() => onConfirm()}>
            Yes
          </button>
          <button className={style.modal__cancel} onClick={() => onCancel()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
