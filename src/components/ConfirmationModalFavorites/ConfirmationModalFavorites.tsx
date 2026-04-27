import React from 'react';
import s from './ConfirmationModalFavorites.module.scss';

interface Props {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModalFavorites: React.FC<Props> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Видалити',
  cancelText = 'Скасувати',
}) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={s.modalOverlay} onClick={handleOverlayClick}>
      <div className={s.modalContent}>
        <button className={s.modalClose} onClick={onCancel}>
          &times;
        </button>

        <p className={s.modalMessage}>{message}</p>

        <div className={s.modalActions}>
          <button
            className={`${s.modalBtn} ${s.cancel}`}
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={`${s.modalBtn} ${s.confirm}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
