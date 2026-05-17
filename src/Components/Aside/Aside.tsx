import React from 'react';
import './Aside.scss';
import Close from '../../images/icons/Close.svg';
import logo from '../../images/Logo.png';
import { NavLink } from 'react-router-dom';
import favourites from '../../images/fav/Icons/Favourites (Heart Like).svg';
import cart from '../../images/fav/Shopping bag (Cart).svg';
import classNames from 'classnames';

type Props = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Aside: React.FC<Props> = ({ setMenuOpen }) => {
  // className for main navigation links (no "selected" decoration)
  const getLink = ({ isActive }: { isActive: boolean }) =>
    classNames('aside__nav-link', {
      'aside__nav-link_active': isActive,
    });

  // className for footer links (apply extra "selected" style when active)
  const getFooterLink = ({ isActive }: { isActive: boolean }) =>
    classNames('aside__nav-button', {
      'aside__nav-button_selected': isActive,
    });

  return (
    <div className="aside">
      <div className="aside__header">
        <img src={logo} className="aside__logo" alt="" />
        <button className="aside__close" onClick={() => setMenuOpen(false)}>
          <img src={Close} alt="" />
        </button>
      </div>
      <nav className="aside__nav">
        <ul className="aside__nav-list">
          <li className="aside__nav-item">
            <NavLink to="/" className={getLink}>
              Home
            </NavLink>
          </li>
          <li className="aside__nav-item">
            <NavLink to="/phones" className={getLink}>
              Phones
            </NavLink>
          </li>
          <li className="aside__nav-item">
            <NavLink to="/tablets" className={getLink}>
              Tablets
            </NavLink>
          </li>
          <li className="aside__nav-item">
            <NavLink to="/accessories" className={getLink}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="aside__footer">
        <NavLink to="/favourites" className={getFooterLink}>
          <button className="aside__footer-button">
            <img src={favourites} alt="" />
          </button>
        </NavLink>
        <NavLink to="/basket" className={getFooterLink}>
          <button className="aside__footer-button">
            <img src={cart} alt="" />
          </button>
        </NavLink>
      </div>
    </div>
  );
};
