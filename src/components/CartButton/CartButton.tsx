import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { useAppSelector } from '../../helpers/hooks';

export const CartButton: React.FC = () => {
  const cartItems = useAppSelector(state => state.cart);

  return (
    <NavLink
      to="/cart"
      className={({ isActive }) => classNames(
        'header__icon-link',
        { 'header__icon-link--active': isActive },
      )}
    >
      <img
        src="img/icons/cart.svg"
        alt="cart"
      />

      {!!cartItems.length && (
        <span className="header__count">{cartItems.length}</span>
      )}
    </NavLink>
  );
};
