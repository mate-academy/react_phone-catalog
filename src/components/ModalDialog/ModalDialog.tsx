import styles from './ModalDialog.module.scss';

type Props = {
  cancel: () => void;
  confirm: () => void;
};

export const ModalDialog: React.FC<Props> = ({ cancel, confirm }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalText}>
          Checkout is not implemented yet. <br /> Do you want to clear the Cart?
        </h3>
        <div className={`buttons ${styles.modalButtons}`}>
          <button className={`button ${styles.modalBtn}`} onClick={cancel}>
            <span className="buttonText">Cancel</span>
          </button>
          <button className={`button ${styles.modalBtn}`} onClick={confirm}>
            <span className="buttonText">Confirm</span>
          </button>
        </div>
      </div>
    </div>
  );
};
