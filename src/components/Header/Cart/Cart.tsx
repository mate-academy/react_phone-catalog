import React, { useMemo } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCart } from '../../../redux';
import { LOCATIONS } from '../../../common/constants';
import { useRouter } from '../../_hooks/useRouter';

export const Cart = ({ isNavOpen }: CartProps) => {
  const cart = useSelector(getCart);
  const { pathname } = useRouter();
  const filledCart = useMemo(() => cart.length > 0, [cart]);

  return (
    <div className={cn({
      cart: true,
      'cart__mobile': isNavOpen,
    })}
    >
      <Link
        to="/cart"
        className={cn({
          cart__button: true,
          'cart--active': pathname === LOCATIONS.cart,
        })}
      />
      {filledCart
      && <span className="cart__indicator">{cart.length}</span>}
    </div>
  );
};
