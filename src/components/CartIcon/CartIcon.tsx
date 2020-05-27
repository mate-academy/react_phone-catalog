
import React, {useContext} from 'react';
import {MyContext} from '../../App';

import './CartIcon.scss';


import {NavLink} from 'react-router-dom';

export const CartIcon = () => {
  const {cart} = useContext(MyContext);


  return (
    <label
      className="CartIcon"
    >
      {cart.length > 0
        ? <span className="CartIcon__count">{cart.length}</span>
        : ""}
      {cart.length > 0
        ? <NavLink className="CartIcon__link" id="CartIcon__link" to="/cart"></NavLink>
        : <span className="CartIcon__link"></span>}
    </label>
  )
}

