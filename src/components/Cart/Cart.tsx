import React, { useMemo } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCartItems } from '../../redux';
import { LOCATIONS } from '../../common/constants';

export const Cart = ({ isNavOpen, closeNavMenu }: CartProps) => {
  const cartItems = useSelector(getCartItems);
  const filledCart = useMemo(() => cartItems.length > 0, [cartItems]);

  const totalItems = useMemo(
    () => cartItems.reduce((acc, item) => item.quantity! + acc, 0),
    [cartItems],
  );

  return (
    <div className={cn({
      cart: true,
      cart__mobile: isNavOpen,
    })}
    >
      <NavLink
        to={LOCATIONS.cart}
        className="cart__button"
        activeClassName="cart__button--active"
        onClick={closeNavMenu}
      >
        {filledCart
        && <span className="cart__indicator">{totalItems}</span>}
      </NavLink>
    </div>
  );
};
