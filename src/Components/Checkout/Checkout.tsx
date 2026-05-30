import React, { useState } from 'react';
import './Checkout.scss';
import { Modal } from '../Modal/Modal';
import { useCart } from '../../context/cartContext';

type Props = {};

export const Checkout: React.FC<Props> = ({}) => {
  const [active, setActive] = useState(false);
  const { cart } = useCart();

  const totalPrice = cart.reduce((acc, cartItem) => {
    return acc + cartItem.item.price * cartItem.count;
  }, 0);

  const totalCount = cart.reduce((acc, cartItem) => {
    return acc + cartItem.count;
  }, 0);

  return (
    <div className="checkout-window">
      <div className="checkout-window__price-for">
        <h1 className="checkout-window__total-price">${totalPrice}</h1>
        <p className="checkout-window__total-items">
          Total for {totalCount} items
        </p>
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
