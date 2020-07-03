import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getItems } from '../../store';

const CartLink = () => {
  const itemsCart = useSelector(getItems);
  const counter = itemsCart.length;

  return (
    <>
      <NavLink to="/cart" className="header__icons" activeClassName="header__icons--active">
        <div className="header__icons--item">
          <img
            src="./img/icons/cart.svg"
            alt="cart icon"
            className="header__icons--img"
          />
          {counter !== 0 && (
            <span className="header__counter">{counter}</span>
          )}
        </div>

      </NavLink>
    </>
  );
};

export default CartLink;
