import styles from './ModalDialog.module.scss';
export type Props = {
  onDelete: () => void;
  displayModal: (v: boolean) => void;
};

export const ModalDialog: React.FC<Props> = ({ onDelete, displayModal }) => {
  return (
    <div className={styles.modalDialog}>
      <div className={styles.modalDialog__container}>
        <div
          className={styles.modalDialog__close}
          onClick={() => {
            displayModal(false);
          }}
        >
          <div className="icon icon--close"></div>
        </div>
        <p>
          Checkout is not implemented yet. <br />
          Do you want to clear the Cart?
        </p>
        <div
          className={`${styles.modalDialog__confirm} button button--black`}
          onClick={() => {
            onDelete();
          }}
        >
          Yes
        </div>
      </div>
    </div>
  );
};
