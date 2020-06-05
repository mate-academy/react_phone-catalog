
import React from 'react';
import { RootState } from '../../store'
import './CartIcon.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const CartIcon = () => {
  const cart = useSelector((state:RootState) => state.cart)

  return (
    <label className="CartIcon">
      {cart.length > 0
        ? <span className="CartIcon__count">{cart.length}</span>
        : ""}
      {cart.length > 0
        ? <NavLink
          className="CartIcon__link"
          id="CartIcon__link"
          to="/cart"></NavLink
        >
        : <span className="CartIcon__link"></span>}
    </label>
  )
}

