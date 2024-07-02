import React, { useContext } from 'react';
import './CheckoutModal.scss';
import { ProductContext } from '../Context/Context';

type Props = {
  setIsModal: (isModal: boolean) => void;
};

export const CheckoutModal: React.FC<Props> = ({ setIsModal }) => {
  const { setLocalCart } = useContext(ProductContext);

  return (
    <div className="checkout-modal">
      <div className="checkout-modal__wrapper">
        <button
          className="checkout-modal__link"
          onClick={() => setIsModal(false)}
        >
          <img
            className="checkout-modal__image"
            src="./img/icons/close.svg"
            alt="close"
          />
        </button>
        <h1 className="page-title checkout-modal__title">
          Checkout is not implemented yet. Do you want to clear the Cart?
        </h1>
        <button
          className="checkout-modal__button"
          onClick={() => {
            setLocalCart([]);
            setIsModal(false);
          }}
        >
          Confirm order
        </button>
      </div>
    </div>
  );
};
