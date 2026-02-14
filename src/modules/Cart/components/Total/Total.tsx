/* eslint-disable max-len */
import React, { useContext } from 'react';

import { CartContext } from '../../../../context/CartContext';
import { Divider } from '../../../HomePage/components/Models/components/Main/components/Model/components/Divider';
import { ModalDialog } from './components/ModalDialog';
import styles from './Total.module.scss';

export const Total: React.FC = () => {
  const { cart, setIsModal, isModal } = useContext(CartContext);
  const cartValues = Object.values(cart);

  const prices = cartValues.map(item => item.fullPrice);
  const items = cartValues.map(item => item.counter);

  const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);
  const totalItems = items.reduce((acc, curr) => acc + curr, 0);

  const onClickHandler = () => {
    setIsModal(true);
  };

  return (
    <div className={styles.total}>
      {isModal && <ModalDialog />}
      <div className={styles['text-wrapper']}>
        <div className={styles['total-price']}>${totalPrice}</div>
        <div className={styles['total-items']}>
          Total for {totalItems} items
        </div>
      </div>
      <Divider />
      <button className={styles.button} onClick={onClickHandler}>
        Checkout
      </button>
    </div>
  );
};
