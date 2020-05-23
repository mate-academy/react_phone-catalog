
import React from 'react';

import './CartIcon.scss';

import {Product} from '../../interfaces';
import {NavLink} from 'react-router-dom';

export const CartIcon = ({cart}:{cart:Product[]}) => {



  return (
    <label
      className="CartIcon"
    >
      {cart.length > 0
        ? <span className="CartIcon__count">{cart.length}</span>
        : ""}
      <NavLink className="CartIcon__link" id="CartIcon__link" to="/cart">

      </NavLink>
    </label>
  )
}

