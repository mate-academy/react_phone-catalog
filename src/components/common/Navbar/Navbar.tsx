import classNames from 'classnames';
import React, { memo } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Navbar.scss';
import { PAGE } from '../../../definitions/enums/Router';
import { Category } from "../../../definitions/enums/Category";

export const Navbar: React.FC = memo(() => {
  const getClasses = ({ isActive }: { isActive: boolean }) => (
    classNames('navbar__item', { 'navbar__item--active': isActive })
  );

  return (
    <nav className="navbar">
      <Link to={PAGE.Home} className="navbar__item">
        <img src="./img/logos/logo.svg" />
      </Link>

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
