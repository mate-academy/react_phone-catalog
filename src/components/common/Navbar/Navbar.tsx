import classNames from 'classnames';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';
import { PAGE } from '../../../definitions/enums/Router';
import { Category } from "../../../api/products/server/types";
import Logo from '../../UI/Logo';

export const Navbar: React.FC = memo(() => {
  const getClasses = ({ isActive }: { isActive: boolean }) => (
    classNames('navbar__item', { 'navbar__item--active': isActive })
  );

  return (
    <nav className="navbar">
      <Logo className='navbar__item'/>

      <NavLink to={PAGE.Home} className={getClasses}>
        Home
      </NavLink>

      <NavLink to={Category.Phones} className={getClasses} end>
        Phones
      </NavLink>

      <NavLink to={Category.Tablets} className={getClasses} end>
        Tablets
      </NavLink>

      <NavLink to={Category.Accessories} className={getClasses} end>
        Accessories
      </NavLink>
    </nav>
  );
});
