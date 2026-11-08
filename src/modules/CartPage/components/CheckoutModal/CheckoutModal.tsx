import { useEffect, useId, useRef } from 'react';
import styles from './CheckoutModal.module.scss';

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CheckoutModal = ({ isOpen, onConfirm, onCancel }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={textId}
      onClose={onCancel}
    >
      <p id={textId} className={styles.text}>
        Checkout is not implemented yet. Do you want to clear the Cart?
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>

        <button type="button" className={styles.confirm} onClick={onConfirm}>
          Clear the cart
        </button>
      </div>
    </dialog>
  );
};
