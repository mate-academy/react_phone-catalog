import styles from './CartModal.module.scss';

type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const CartModal: React.FC<Props> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.modal__text}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <div className={styles.modal__actions}>
          <button className={styles.modal__btn} onClick={onConfirm}>
            Yes, clear
          </button>
          <button className={styles.modal__btn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
