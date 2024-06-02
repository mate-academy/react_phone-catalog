import React from 'react';
import CartItem from './CartItem/CartItem';
import './CartPageStyle.scss';

const CartPage = () => {
  return (
    <div className="cartPage container">
      <div className="cartPage__main">
        <button className="cartPage__back">
          <img
            src="icons/arrow-up-black.png"
            alt=""
            className="cartPage__back--img"
          />
          <div className="cartPage__back--text">Back</div>
        </button>
        <h1 className="cartPage__title">Cart</h1>
        <div className="cartPage__cards">
          <CartItem />
        </div>
      </div>
      <div className="cartPage__footer">
        <div className="cartPage__info">
          <h2 className="cartPage__price">$2657</h2>
          <div className="cartPage__couter-item">Total for 3 items</div>
        </div>
        <hr className="cartPage__line" />
        <button className="cartPage__button-checkout">checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
