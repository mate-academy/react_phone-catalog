import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';

export const Favorites: FC = () => {
  return (
    <NavLink
      to="/favorites"
      className={({ isActive }) => classNames(
        'header__top-actions header__top-actions--favorites',
        {
          'header__top-actions--active': isActive,
        },
      )}
    >
      <Icon type="favorites" />
    </NavLink>
  );
};
