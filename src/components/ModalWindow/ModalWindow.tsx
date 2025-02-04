import React, { useEffect } from 'react';
import styles from './ModalWindow.module.scss';
import { useProductsContext } from '../../hooks/savedProducts';
import { Icon } from '../Icon';

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
};

export const ModalWindow: React.FC<Props> = ({ setIsModalOpen }) => {
  const { clearCart } = useProductsContext();

  useEffect(() => {
    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleYes = () => {
    setIsModalOpen(false);
    clearCart();
  };

  const handleNo = () => {
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles['modal-overlay']} />
      <div className={styles.modal}>
        <div className={styles.modal__wrapper}>
          <button className={styles.modal__close} onClick={handleClose}>
            <Icon type="closeCart" />
          </button>

          <div className={styles.modal__text}>
            If you behave well, Santa Claus will bring you this for Christmas
          </div>
        </div>

        <div className={styles.modal__btns}>
          <button className={styles.modal__yes} onClick={handleYes}>
            Yes
          </button>
          <button className={styles.modal__no} onClick={handleNo}>
            No
          </button>
        </div>
      </div>
    </>
  );
};
