import React from 'react';
import { NavLink } from 'react-router-dom';

const CartLink = () => {
  return (
    <>
      <NavLink to="/cart" className="header__icons" activeClassName="header__icons--active">
        <div className="header__icons--item">
          <img
            src="./img/icons/cart.svg"
            alt="cart icon"
            className="header__icons--img"
          />
        </div>
      </NavLink>
    </>
  );
};

export default CartLink;
