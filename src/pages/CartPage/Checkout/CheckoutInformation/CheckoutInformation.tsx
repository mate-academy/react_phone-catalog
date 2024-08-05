import { createPortal } from 'react-dom';
import {
  getTotalAmountOfItems,
  getTotalPriceOfProducts,
} from '../../../../helpers/helpers';
import { useAppSelector } from '../../../../hooks/hooks';
import { Modal } from '../../../../modules/Modal';
import styles from './CheckoutInformation.module.scss';
import { useState } from 'react';

export const CheckoutInformation = () => {
  const { items } = useAppSelector(state => state.cart);

  const totalAmountOfItems = getTotalAmountOfItems(items);

  const totalPriceOfProducts = getTotalPriceOfProducts(items);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.checkout_information}>
        <div className={styles.checkout_information__wrapper}>
          <div className={styles.checkout_information__box}>
            <h2 className={styles.checkout_information__price}>
              ${totalPriceOfProducts}
            </h2>
            <p className={styles.checkout_information__total}>
              Total for {totalAmountOfItems} items
            </p>
          </div>
          <div className={styles.checkout_information__button}>
            <button
              className={styles.checkout_information__btn}
              onClick={() => setIsOpen(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {createPortal(
        <Modal
          title={
            'Checkout is not implemented yet. Do you want to clear the Cart?'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />,
        document.querySelector('#popup') as Element,
      )}
    </>
  );
};
