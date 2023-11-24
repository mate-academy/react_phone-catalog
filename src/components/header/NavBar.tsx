import React from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import './header.scss';
import logo from '../../icons/logo.svg';

export const NavBar: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('nav__link', { 'is-active': isActive });
  };

  return (
    <>
      <header className="header">
        <div className="header__links">
          <Link className="header__logo" to="/">
            <img src={logo} alt="logo" />
          </Link>

          <div className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink to="/" className={getLinkClass}>Home</NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/phones" className={getLinkClass}>Phones</NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/tablets"
                  className={getLinkClass}
                >
                  tablets
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/accessories"
                  className={getLinkClass}
                >
                  accessories
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};
