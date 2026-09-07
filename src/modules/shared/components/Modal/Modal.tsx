import styles from './Modal.module.scss';

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export const Modal: React.FC<Props> = ({ onClose, onConfirm }) => {
  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleOutClick}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Checkout is not implemented yet. </h3>
        <p className={styles.text}>Do you want to clear the Cart?</p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.confirm} onClick={onConfirm}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
