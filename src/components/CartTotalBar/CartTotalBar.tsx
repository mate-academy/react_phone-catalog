/* eslint-disable react/button-has-type */
import React from 'react';
import './CartTotalBar.scss';

type Props = {
  totalPrice: number,
  totalItems: number,
  showMessage: React.Dispatch<React.SetStateAction<boolean>>,
};

export const CartTotalBar: React.FC<Props> = (
  {
    totalPrice, totalItems, showMessage,
  },
) => {
  const handleSubmitCheckout = () => {
    showMessage(true);

    setTimeout(() => {
      showMessage(false);
    }, 3000);
  };

  return (
    <div className="cart-total-bar">
      <p className="cart-total-bar__total-price">
        {`$${totalPrice}`}
      </p>

      <p className="cart-total-bar__total-items">
        {`Total for ${totalItems} items`}
      </p>

      <div className="cart-total-bar__sepator" />

      <button
        onClick={handleSubmitCheckout}
        className="cart-total-bar__button-checkout button button__primary"
      >
        Checkout
      </button>
    </div>
  );
};
