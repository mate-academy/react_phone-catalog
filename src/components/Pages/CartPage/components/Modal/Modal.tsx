import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import styles from './Modal.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GlobalContext } from '../../../../shared/GlobalContext/GlobalContext';
import classNames from 'classnames';

type ModalProps = {
  isOpen: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  // onConfirm: () => void;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpenModal }) => {
  const { setIsGoods, isSunSelected } = useContext(GlobalContext);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.modalOpen);
    } else {
      document.body.classList.remove(styles.modalOpen);
    }

    return () => {
      document.body.classList.remove(styles.modalOpen);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handlerConfirm = () => {
    setIsOpenModal(false);
    setIsGoods([]);
  };

  const handlerCancel = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div
        className={classNames(styles.modal, {
          [styles.modal_dark]: !isSunSelected,
        })}
      >
        <div className={styles.modal__great}>
          <CheckCircleIcon
            style={{
              color: 'green',
              fontSize: 100,
            }}
          />
          <h2
            className={classNames(styles.modal__great_title, {
              [styles.modal__great_title_dark]: !isSunSelected,
            })}
          >
            Great
          </h2>
        </div>

        <p
          className={classNames(styles.modal__text, {
            [styles.modal__text_dark]: !isSunSelected,
          })}
        >
          Are you sure you want to buy all the products?
        </p>
        <div className={styles.modal__buttons}>
          <button
            onClick={handlerConfirm}
            className={classNames(styles.modal__buttons_confirm, {
              [styles.modal__buttons_confirm_dark]: !isSunSelected,
            })}
          >
            Confirm
          </button>
          <button
            onClick={handlerCancel}
            className={classNames(styles.modal__buttons_cancel, {
              [styles.modal__buttons_cancel_dark]: !isSunSelected,
            })}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
