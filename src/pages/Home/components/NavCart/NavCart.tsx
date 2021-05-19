import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCartGoods } from '../../../../store/store';
import './NavCart.scss';

export const NavCart = () => {
  const cartGoods = useSelector(getCartGoods);

  return (
    <NavLink
      to="/cart"
      className="Container Header-Cart"
      activeClassName="Header-Cart_active"
    >
      <img
        src="img/icons/cart.svg"
        alt="header-cart"
      />

      {cartGoods.length !== 0 && (
        <div className="Header-CartCounter">
          {cartGoods.length}
        </div>
      )}
    </NavLink>
  );
};
