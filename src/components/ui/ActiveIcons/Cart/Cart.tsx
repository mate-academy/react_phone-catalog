import React, { useContext } from 'react';
import './CartStyle.scss';
import { StateContext } from 'src/store';

const Cart = () => {
  const { cart } = useContext(StateContext);
  const isCart = cart.length > 0;

  return (
    <div className="cart">
      <div className="cart__icon">
        <img src="icons/Cart.png" alt="cart" className="cart__icon--img" />
        {isCart && <div className="cart__icon--counter">{cart.length}</div>}
      </div>
    </div>
  );
};

export default Cart;
