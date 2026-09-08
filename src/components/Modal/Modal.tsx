import React from 'react';
import classNames from 'classnames';
import styles from './Modal.module.scss';
import { CloseIcon } from '../icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
};

export const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}) => {
  if (!isOpen) {
    return null;
  }

  // Обробник підтвердження
  const handleConfirm = () => {
    onConfirm();
    onClose(); // Закриваємо вікно після підтвердження
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Кнопка закриття (X) */}
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>

        {/* Заголовок або тіло повідомлення */}
        <div className={styles.content}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <p className={styles.message}>{message}</p>
        </div>

        {/* Кнопки дій */}
        <div className={styles.actions}>
          <button
            className={classNames(styles.button, styles.confirmButton)}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>

          <button
            className={classNames(styles.button, styles.cancelButton)}
            onClick={onClose} // Скасування = просто закрити вікно
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
