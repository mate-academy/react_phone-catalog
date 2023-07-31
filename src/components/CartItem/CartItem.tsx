import React, { useState } from 'react';

import testImg from '../../img/phones/t-mobile-g2.0.jpg';
import crossIcon from '../../images/cross.svg';

import './CartItem.scss';

export const CartItem: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="CartItem">
      <button
        type="button"
        className="CartItem__remove-btn"
        data-cy="cartDeleteButton"
      >
        <img src={crossIcon} alt="delete item" />
      </button>
      <div className="CartItem__photo">
        <img src={testImg} alt="" className="CartItem__img" />
      </div>
      <div className="CartItem__title">
        Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
      </div>
      <button
        type="button"
        className="CartItem__decrease"
        onClick={handleDecrease}
      >
        -
      </button>
      <div
        className="CartItem__quantity"
        data-cy="productQauntity"
      >
        {quantity}
      </div>
      <button
        type="button"
        className="CartItem__increase"
        onClick={handleIncrease}
      >
        +
      </button>
      <div className="CartItem__price">$1099</div>
    </div>
  );
};
