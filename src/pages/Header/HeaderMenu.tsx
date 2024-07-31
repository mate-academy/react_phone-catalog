import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const HeaderMenu: React.FC = () => {
  return (
    <nav className="header__menu">
      <div className="header__container">
        <div className="header__top-heads">
          <NavLink to="/" className="header__home">
            HOME
          </NavLink>
          <NavLink to="/phones" className="header__phones">
            PHONES
          </NavLink>
          <NavLink to="/tablets" className="header__tablets">
            TABLETS
          </NavLink>
          <NavLink to="/accessories" className="header__accessories">
            ACCESSORIES
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
