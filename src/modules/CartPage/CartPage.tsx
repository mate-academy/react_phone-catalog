import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../state/state';

import style from './CartPage.module.scss';

import { BackButton } from '../../components/BackButton/BackButton';
import { CartList } from '../../components/CartList/CartList';
import { CartTotal } from '../../components/CartTotal/CartTotal';
import { CartEmpty } from '../../components/CartEmpty/CartEmpty';
import { Modal } from '../../components/Modal/Modal';
import { ActionTypes } from '../../enums/ActionTypes';

export const CartPage: React.FC = () => {
  const { state, dispatch } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isModalOpen) {
      htmlElement.classList.add('overflow-hidden');
    } else {
      htmlElement.classList.remove('overflow-hidden');
    }

    return () => {
      htmlElement.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);

  return (
    <div className={style.cart_page}>
      <BackButton className={style.cart_page__back_button} />

      <h1 className={style.cart_page__title}>Cart</h1>

      {state.cart.length > 0 ? (
        <>
          <CartList />
          <CartTotal onCheckout={() => setIsModalOpen(true)} />
        </>
      ) : (
        <CartEmpty />
      )}

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h3 className={style.modal__info}>Your cart is ready</h3>
        <p className={style.modal__text}>
          Do you want to finalize your purchase?
        </p>
        <div className={style.modal__wrapper}>
          <button
            onClick={() => {
              handleModalClose();
              dispatch({ type: ActionTypes.CLEAR_CART });
            }}
            className={`${style.modal__wrapper_button} ${style.modal__wrapper_button_confirm}`}
          >
            Confirm
          </button>
          <button
            onClick={handleModalClose}
            className={`${style.modal__wrapper_button} ${style.modal__wrapper_button_cancel}`}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};
