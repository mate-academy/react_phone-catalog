import { useContext } from 'react';
import styles from './CheckoutModal.module.scss';
import { DispatchContext } from '../../hooks/SelectionState';
import Close from '../../../images/icons/Close.png';

interface Props {
  close: () => void;
}

export const CheckoutModal: React.FC<Props> = ({ close }) => {
  const dispatch = useContext(DispatchContext);
  const confirm = () => {
    dispatch({ type: 'clearCart' });
    close();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <button className={styles.modal__close} onClick={close}>
          <img src={Close} className={styles.modal__icon} />
        </button>
        <p className={styles.modal__text}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <button className={styles.modal__confirm} onClick={confirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};
