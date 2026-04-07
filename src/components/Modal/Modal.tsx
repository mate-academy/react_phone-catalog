import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss'; // Або ваші стилі

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  footer,
}) => {
  // Закриття на клавішу Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      {/* onClick={e => e.stopPropagation()} зупиняє закриття при кліку на саме вікно */}
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          {title && <h2>{title}</h2>}
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer ? (
          <div className={styles.footer}>{footer}</div>
        ) : onConfirm ? (
          // Якщо є onConfirm — стандартні кнопки
          <div className={styles.footer}>
            <button
              className={`${styles.btn} ${styles.confirm}`}
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              className={`${styles.btn} ${styles.decline}`}
              onClick={onClose}
            >
              Decline
            </button>
          </div>
        ) : null}
      </div>
    </div>,
    modalRoot,
  );
};
