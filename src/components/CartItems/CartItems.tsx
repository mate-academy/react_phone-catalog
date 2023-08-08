import { useContext } from 'react';
import { StateContext } from '../Store';
import { CartItem } from '../CartItem/CartItem';

import './style.scss';

export const CartItems = () => {
  const { cartItems } = useContext(StateContext);

  return (
    <ul className="cartItems__list">
      {cartItems.map((cart) => (
        <li key={cart.id} className="cartItems__listItem">
          <CartItem
            id={cart.id}
            product={cart.product}
            quantity={cart.quantity}
            discount={cart.discount}
          />
        </li>
      ))}
    </ul>
  );
};
