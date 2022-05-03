import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCartGoods } from '../../store';
import './Order.scss';

export const Order = () => {
  const [showWarningMessage, setShowWarningMessage] = useState<boolean>(false);
  const cartGoods = useSelector(getCartGoods);
  const cartItems = cartGoods.reduce((prev, good) => prev + good.quantity, 0);

  const getOrderAmount = () => cartGoods.reduce((prev, good) => prev
     + (good.quantity * good.price * (1 - good.discount / 100)), 0);

  const warningMessage = () => {
    setShowWarningMessage(true);

    setTimeout(() => {
      setShowWarningMessage(false);
    }, 3000);
  };

  return (
    <div className="Order Cart-Order">
      <div className="Order-Container">
        <span className="Order-Price">
          {`$${getOrderAmount()}`}
        </span>
        <span className="Order-Description">
          {`Total for ${cartItems} ${cartItems === 1 ? 'item' : 'items'}`}
        </span>
        <button
          type="button"
          className="Order-Button"
          onClick={warningMessage}
        >
          Checkout
        </button>
        {showWarningMessage && (
          <span className="Order-Warning">
            We are sorry, but this feature is not implemented yet
          </span>
        )}

      </div>
    </div>
  );
};
