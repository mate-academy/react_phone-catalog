import React, { memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';
import { PAGE } from '../../../definitions/enums/Router';
import { Category } from '../../../api/products/server/types';
import { useDirection } from '../../../enhancers/hooks/direction';
import Logo from '../../UI/Logo';

export const Navbar: React.FC = memo(() => {
  const direction = useDirection();

  const getClasses = useCallback(({ isActive }: { isActive: boolean }) => (
    ['navbar__item', isActive ? 'navbar__item--active' : ''].join(' ')
  ), []);

  return (
    <nav className="navbar">
      <Logo className="navbar__item navbar__item--logo" />

      <NavLink to={direction(PAGE.Home)} className={getClasses}>
        Home
      </NavLink>

      <NavLink to={direction(Category.Phones)} className={getClasses} end>
        Phones
      </NavLink>

      <NavLink to={direction(Category.Tablets)} className={getClasses} end>
        Tablets
      </NavLink>

      <NavLink to={direction(Category.Accessories)} className={getClasses} end>
        Accessories
      </NavLink>
    </nav>
  );
});
