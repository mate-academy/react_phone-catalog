/* eslint-disable max-len */
import React, { useContext } from 'react';

import { CartContext } from '../../../../../../context/CartContext';
import { NavLinks } from '../../../../../../enums/NavLinks';
import { Divider } from '../../../../../HomePage/components/Models/components/Main/components/Model/components/Divider';
import styles from './ModalDialog.module.scss';

export const ModalDialog: React.FC = () => {
  const { setCart, setIsModal } = useContext(CartContext);

  const yesHandler = () => {
    setCart({});
    localStorage.setItem(NavLinks.cart, JSON.stringify({}));
    setIsModal(false);
  };

  const cancelHandler = () => {
    setIsModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles['content-wrapper']}>
          <h4 className={styles.title}>Checkout is not implemented yet.</h4>
          <Divider />
          <div className={styles['clear-wrapper']}>
            <div className={styles.question}>
              Do you want to clear the Cart?
            </div>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={yesHandler}>
                Yes
              </button>
              <button className={styles.button} onClick={cancelHandler}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
