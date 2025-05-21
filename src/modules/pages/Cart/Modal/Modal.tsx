import styles from './Modal.module.scss';

type Props = {
  closeModal: (value: boolean) => void;
  clearTheCart: () => void;
};

export const Modal: React.FC<Props> = ({ closeModal, clearTheCart }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__box}>
        <span>
          <h3>Checkout is not implemented yet.</h3>
          <h4>Do you want to clear the Cart?</h4>
        </span>
        <div className={styles.buttons}>
          <button className={styles.buttons__confirm} onClick={clearTheCart}>
            Confirm the order
          </button>
          <button
            className={styles.buttons__cancel}
            onClick={() => closeModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
