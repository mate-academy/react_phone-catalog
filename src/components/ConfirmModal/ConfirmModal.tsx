import styles from './ConfirmModal.module.scss';

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.ConfirmModal__backdrop}
      onClick={onCancel}
      role="presentation"
    >
      <div
        className={styles.ConfirmModal__modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title}
        aria-describedby={description}
        onClick={e => e.stopPropagation()}
      >
        <h2 id="confirm-title" className={styles.ConfirmModal__title}>
          {title}
        </h2>
        <p id="confirm-desc" className={styles.ConfirmModal__desc}>
          {description}
        </p>

        <div className={styles.ConfirmModal__actions}>
          <button
            className="button button--width100 button--text button--big"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="button button--filled button--width100 button--big"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
