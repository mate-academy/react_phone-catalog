import classNames from 'classnames';
import styles from './CartModal.module.scss';
import { clearAllCartItem } from '../../../../features/CartSlice';
import { useAppDispatch } from '../../../../app/hooks';
export const CartModal = ({ setModal }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.backdoor}>
      <div className={styles.modal}>
        <div className={styles.modal__cart}>
          <p className={styles.modal__title}>
            Checkout is not implemented yet.
            <br />
            Do you want to clear the Cart?:
          </p>
          <div className={styles.modal__change}>
            <div
              className={styles.modal__button}
              onClick={() => {
                dispatch(clearAllCartItem());
                setModal(false);
              }}
            >
              Yes
            </div>
            <div
              className={classNames(styles.modal__button, [
                styles['modal__button--left'],
              ])}
              onClick={() => setModal(false)}
            >
              No
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
