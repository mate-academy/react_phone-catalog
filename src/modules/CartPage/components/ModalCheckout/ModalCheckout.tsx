import { useAppDispatch } from '../../../../app/hooks';
import { clearCart } from '../../../../features/cartSlice';
import styles from './ModalCheckout.module.scss';

type Props = {
  onClick: () => void;
};

export const ModalCheckout: React.FC<Props> = ({ onClick }) => {
  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clearCart());
    onClick();
  };

  const handleCancel = () => {
    onClick();
  };

  return (
    <aside className={styles.overley} onClick={onClick}>
      <div className={styles.overley__wrapper}>
        <div
          className={styles.confirmation}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
          }}
        >
          <p className={styles.confirmation__title}>
            Checkout is not implemented yet.
          </p>
          <p className={styles.confirmation__text}>
            Do you want to clear the Cart?
          </p>
          <div className={styles.confirmation__control}>
            <button
              className={styles.confirmation__clear}
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              className={styles.confirmation__cancel}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
