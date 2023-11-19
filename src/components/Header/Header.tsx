import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../images/logo.svg';
import favourites from '../../images/favourites-hart-like.svg';
import bag from '../../images/shopping-bag.svg';

const getLinkClass = ({ isActive }: { isActive: boolean }) => (
  classNames('list__link', {
    'list__link--active': isActive,
  })
);

export const Header: React.FC = () => {
  return (
    <header className="header top-bar">
      <div className="top-bar__nav">
        <NavLink className="logo" to="/">
          <img className="logo__image" src={logo} alt="Logo" />
        </NavLink>
        <ul className="list">
          <li className="list__item">
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>
          </li>
          <li className="list__item">
            <NavLink className={getLinkClass} to="/phones">Phones</NavLink>
          </li>
          <li className="list__item">
            <NavLink className={getLinkClass} to="/tablets">Tablets</NavLink>
          </li>
          <li className="list__item">
            <NavLink className={getLinkClass} to="/accessories">
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="top-bar__options">
        <a className="top-bar__option" href="/">
          <img className="icon" src={favourites} alt="favourites" />
        </a>

        <a className="top-bar__option" href="/">
          <img className="icon" src={bag} alt="shopping bag" />
        </a>
      </div>
    </header>
  );
};
