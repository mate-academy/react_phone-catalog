import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../state/state';
import { ActionTypes } from '../../enums';
import { CartList, CartTotal, CartEmpty } from './components';
import { BackButton, Modal } from '../../components';
import './CartPage.scss';

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
    <div className="cart">
      <BackButton className="cart__back-button" />
      <h1 className="cart__title typography__h1">Cart</h1>

      {state.cart.length > 0 ? (
        <>
          <CartList />
          <CartTotal onCheckout={() => setIsModalOpen(true)} />
        </>
      ) : (
        <CartEmpty />
      )}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h3 className="modal__info typography__h3">
          Checkout is not implemented yet.
        </h3>
        <p className="modal__info">Do you want to clear the Cart?</p>
        <div className="modal__button-wrapper">
          <button
            className="modal__button modal__button--confirm"
            onClick={() => {
              handleModalClose();
              dispatch({ type: ActionTypes.CLEAR_CART });
            }}
          >
            Confirm
          </button>
          <button
            className="modal__button modal__button--cancel"
            onClick={handleModalClose}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};
