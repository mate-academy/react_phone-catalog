import styles from './Modal.module.scss';
import { cartActions } from '../../store/cart/cartSlice';
import { useAppDispatch } from '../../store/hooks';

type Props = {
  close: () => void;
};

export const Modal: React.FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.modal}>
      <div className={styles.modal__message}>
        <p className={styles.modal__text}>Checkout is not implemented yet.</p>
        <p className={`${styles.modal__text} ${styles['modal__text--accent']}`}>
          Do you want to clear the Cart?
        </p>
      </div>

      <div className={styles.modal__actions}>
        <button
          className={`${styles.modal__btn} ${styles['modal__btn--confirm']}`}
          onClick={() => {
            dispatch(cartActions.clear());
            close();
          }}
        >
          Confirm
        </button>
        <button
          className={`${styles.modal__btn} ${styles['modal__btn--cancel']}`}
          onClick={close}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
