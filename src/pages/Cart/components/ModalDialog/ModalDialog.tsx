import styles from './ModalDialog.module.scss';
import { useContext } from 'react';
import { ProductContext } from '../../../../store/ProductContext';
import { getButtonClass } from '../../../../utils/getButtonClass';
export type Props = {
  onDelete: () => void;
  displayModal: (v: boolean) => void;
};

export const ModalDialog: React.FC<Props> = ({ onDelete, displayModal }) => {
  const { darkTheme } = useContext(ProductContext);

  return (
    <div className={styles.modalDialog}>
      <div className={styles.modalDialog__container}>
        <div
          className={styles.modalDialog__close}
          onClick={() => displayModal(false)}
        >
          <div className="icon icon--close"></div>
        </div>
        <p>
          Checkout is not implemented yet. <br />
          Do you want to clear the Cart?
        </p>
        <div
          className={`${styles.modalDialog__confirm} ${getButtonClass.main(darkTheme)}`}
          onClick={() => onDelete()}
        >
          Yes
        </div>
      </div>
    </div>
  );
};
