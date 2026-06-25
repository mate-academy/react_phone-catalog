import React, { useEffect } from 'react';
import styles from './Modal.module.scss';

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 3l10 10M13 3L3 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

interface Props {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<Props> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKey);

    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className={styles.overlay}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.top}>
          <h3 className={styles.title} id="modal-title">
            {title}
          </h3>
          <button
            className={styles.closeBtn}
            onClick={onCancel}
            aria-label="Close"
          >
            <IconClose />
          </button>
        </div>

        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Confirm
          </button>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
