import React, { useMemo } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCartItems } from '../../redux';
import { LOCATIONS } from '../../common/constants';
import { useRouter } from '../_hooks/useRouter';

export const Cart = ({ isNavOpen, closeNavMenu }: CartProps) => {
  const cartItems = useSelector(getCartItems);
  const { pathname } = useRouter();
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
      <Link
        to="/cart"
        className={cn({
          cart__button: true,
          'cart--active': pathname === LOCATIONS.cart,
        })}
        onClick={closeNavMenu}
      >
        {filledCart
        && <span className="cart__indicator">{totalItems}</span>}
      </Link>
    </div>
  );
};
