import styles from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  const handleBackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modal} onClick={handleBackClick}>
      <div className={styles.modal__container}>
        <h3>Checkout is not implemented yet.</h3>
        <h4>Do you want to clear the Cart?</h4>
        <div className={styles.modal__buttons}>
          <button className={styles.modal__confirmButton} onClick={onConfirm}>
            Yes, clear the Cart
          </button>
          <button className={styles.modal__cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
