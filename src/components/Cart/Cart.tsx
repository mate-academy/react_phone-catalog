import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import cart from '../../images/icons/Cart.svg';

import './Cart.scss';

export const Cart = () => {
  const location = useLocation();
  const path = location.pathname.split('/').slice(-1);
  let keys = Object.keys(localStorage);

  keys = keys.filter((key) => key.includes('cart') === true);

  return (
    <NavLink
      to="/cart"
      className={
        classNames(
          'CartLink',
          { 'CartLink--active': path[0] === 'cart' },
        )
      }
    >
      {keys.length > 0
      && <p className="CartLink__count">{keys.length}</p>}
      <img
        src={cart}
        alt="Shopping bag"
        className={
          classNames(
            'Cart',
            { 'Cart--active': path[0] === 'cart' },
          )
        }
      />
    </NavLink>
  );
};
