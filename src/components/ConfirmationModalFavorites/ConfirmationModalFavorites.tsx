import React from 'react';
import './ConfirmationModalFavorites.scss';

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

  // Закриття при кліку на фон (overlay)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onCancel}>
          &times;
        </button>

        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button className="modal-btn modal-btn--cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="modal-btn modal-btn--confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
