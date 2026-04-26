import styles from './CheckoutModal.module.scss';

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export const CheckoutModal: React.FC<Props> = ({ onClose, onConfirm }) => {
  return (
    <div className={styles.modal} onClick={onClose}>
      <div
        className={styles.modal__content}
        onClick={event => event.stopPropagation()}
      >
        <h2 className={styles.modal__title}>Checkout is not implemented yet</h2>

        <p className={styles.modal__text}>Do you want to clear the Cart?</p>

        <div className={styles.modal__actions}>
          <button
            type="button"
            className={styles.modal__buttonSecondary}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className={styles.modal__buttonPrimary}
            onClick={onConfirm}
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
};
