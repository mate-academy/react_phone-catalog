import React, { useState } from 'react';
import './Checkout.scss';
import { Modal } from '../Modal/Modal';

type Props = {
  count: number;
  totalPrice: number;
};

export const Checkout: React.FC<Props> = ({ count, totalPrice }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="checkout-window">
      <div className="checkout-window__price-for">
        <h1 className="checkout-window__total-price">${totalPrice}</h1>
        <p className="checkout-window__total-items">Total for {count} items</p>
      </div>

      <button
        className="checkout-window__button"
        onClick={() => setActive(true)}
      >
        Checkout
      </button>
      {active && <Modal setActive={setActive} />}
    </div>
  );
};
