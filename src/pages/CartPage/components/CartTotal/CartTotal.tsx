import React from 'react';
import './CartTotal.scss';
import { useStateContext } from '../../../../state/state';
import { CheckoutButton } from '../../../../components/Buttons';

type Props = {
  onCheckout: () => void;
};

export const CartTotal: React.FC<Props> = ({ onCheckout }) => {
  const { state } = useStateContext();
  const countItemsInCart = state.cart.reduce(
    (sum, item) => item.quantity + sum,
    0,
  );
  const total = state.cart.reduce(
    (sum, item) => item.quantity * item.price + sum,
    0,
  );

  return (
    <div className="cart__total">
      <div className="cart__total-price">
        <h2 className="cart__total-value">{`$${total}`}</h2>
        <p className="cart__total-text typography__body">{`Total for ${countItemsInCart} items `}</p>
      </div>
      <div className="cart__total-devider"></div>
      <CheckoutButton onClick={onCheckout}>Checkout</CheckoutButton>
    </div>
  );
};
