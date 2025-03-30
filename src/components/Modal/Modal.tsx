import { Modal as MiuModal } from '@mui/material';
import styles from './Modal.module.scss';

type Props = {
  openModal: boolean;
  handleClose: () => void;
  handleClearCart: () => void;
};

const Modal: React.FC<Props> = ({
  openModal,
  handleClose,
  handleClearCart,
}) => {
  return (
    <MiuModal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          invisible: true,
        },
      }}
    >
      <div className={styles.modal}>
        <h2 className={styles.modal__title}>
          Checkout is not implemented yet.
        </h2>

        <h2 className={styles.modal__text}>Do you want to clear the Cart?</h2>

        <div className={styles.modal__buttons}>
          <button className={styles.modal__clear} onClick={handleClearCart}>
            Clear
          </button>
          <button className={styles.modal__cancel} onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </MiuModal>
  );
};

export default Modal;
