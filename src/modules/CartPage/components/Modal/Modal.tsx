import { useContext } from 'react';
import styles from './Modal.module.scss';
import { DispatchContext } from '../../../../contex/State';

interface Props {
  close: () => void;
}

export const Modal: React.FC<Props> = ({ close }) => {
  const dispatch = useContext(DispatchContext);

  const onConfirmClick = () => {
    dispatch({ type: 'clearCart' });
    close();
  };

  return (
    <dialog className={styles.modal}>
      <button className={styles.modal__close} onClick={close}>
        <span className="visually-hidden">close</span>
      </button>
      <p className={styles.modal__text}>
        Checkout is not implemented yet. Do you want to clear the Cart?
      </p>
      <button onClick={onConfirmClick} className={styles.modal__confirm}>
        Confirm
      </button>
    </dialog>
  );
};
