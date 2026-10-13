import { useCart } from '../../../../context/CartContext';
import styles from './Modal.module.scss';

type Props = {
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ onClose }) => {
  const { clearCart } = useCart();

  return (
    <div className={styles.modal}>
      <div className={styles.modal__top}>
        <h3 className={styles.modal__title}>Checkout is not implemented yet</h3>
        <p className={styles.modal__text}>Do you want to clear the Cart?</p>
      </div>
      <div className={styles.modal__bottom}>
        <button type="button" className={styles.modal__close} onClick={onClose}>
          Close
        </button>
        <button
          type="button"
          className={styles.modal__clear}
          onClick={() => {
            clearCart();
            onClose();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
