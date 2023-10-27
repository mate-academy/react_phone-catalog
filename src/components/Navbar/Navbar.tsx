import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Navbar.scss';

const getClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('Navbar__item', {
    'Navbar__item--active': isActive,
  });
};

export const Navbar: React.FC = () => {
  return (
    <nav className="Navbar">
      <ul className="Navbar__list">
        <li>
          <NavLink to="/" className={getClassName}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/phones" className={getClassName}>
            Phones
          </NavLink>
        </li>
        <li>
          <NavLink to="/tablets" className={getClassName}>
            Tablets
          </NavLink>
        </li>
        <li>
          <NavLink to="/accessories" className={getClassName}>
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
