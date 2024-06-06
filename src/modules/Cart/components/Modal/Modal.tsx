import classNames from 'classnames';
import styles from './Modal.module.scss';
import React, { useContext } from 'react';
import { DispatchContext } from '../../../../Store';

type Props = {
  setIsModalOpen: (value: boolean) => void;
};

export const Modal: React.FC<Props> = ({ setIsModalOpen }) => {
  const dispatch = useContext(DispatchContext);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    dispatch({ type: 'clearCart' });
    setIsModalOpen(false);
  };

  return (
    <div className={styles.modal}>
      <span className={styles.modal__text}>
        Checkout is not implemented yet.
        <br />
        Do you want to clear the Cart?
      </span>
      <div className={styles.modal__buttons}>
        <button
          className={classNames(
            styles.modal__button,
            styles['modal__button-confirm'],
          )}
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className={classNames(
            styles.modal__button,
            styles['modal__button-cancel'],
          )}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
