import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';

export const Cart: FC = () => {
  return (
    <NavLink
      to="/shopping-cart"
      className={({ isActive }) => classNames(
        'header__top-actions header__top-actions--cart',
        {
          'header__top-actions--active': isActive,
        },
      )}
    >
      <Icon type="cart" />
    </NavLink>
  );
};
