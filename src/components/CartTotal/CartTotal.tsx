import React from 'react';
import style from './CartTotal.module.scss';
import { useStateContext } from '../../state/state';
import { CheckoutButton } from '../CheckoutButton/CheckoutButton';

interface Props {
  onCheckout: () => void;
}

export const CartTotal: React.FC<Props> = ({ onCheckout }) => {
  const { state } = useStateContext();
  const countItems = state.cart.reduce((sum, item) => item.quantity + sum, 0);

  const total = state.cart.reduce(
    (sum, item) => item.quantity * item.price + sum,
    0,
  );

  return (
    <div className={style.cart__total}>
      <div className={style.cart__total_price}>
        <h2 className={style.cart__total_price_value}>{`$${total}`}</h2>
        <p
          className={style.cart__total_price_text}
        >{`Total for ${countItems} items`}</p>
      </div>
      <div className={style.cart__total_devider}>
        <CheckoutButton onClick={onCheckout}>Checkout</CheckoutButton>
      </div>
    </div>
  );
};
