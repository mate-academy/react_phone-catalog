/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { SidebarContext } from '../../store/SidebarContext';
import {
  IconClose,
  IconFavourites,
  IconMenu,
  IconShoppingCart,
} from '../shared/IconsSVG';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('header__nav-link navigation-title', {
    active: isActive,
  });

export const Header: React.FC = React.memo(() => {
  const { isOpenSidebar, setIsOpenSidebar } = useContext(SidebarContext);

  return (
    <header className="header">
      <div className="header__container">
        <Link
          to="/"
          className="header__logo-link"
          onClick={() => setIsOpenSidebar(false)}
        >
          <img
            src="/img/logo/logo-mobile.svg"
            alt="logo"
            className="header__logo logo"
          />
        </Link>

        <div className="header__nav">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/phones" className={getLinkClass}>
            Phones
          </NavLink>

          <NavLink to="/tablets" className={getLinkClass}>
            Tablets
          </NavLink>

          <NavLink to="/accessories" className={getLinkClass}>
            Accessories
          </NavLink>
        </div>

        <div className="header__navbar-icons icons-wrapper">
          <Link
            to="favourites"
            className="icon-container header__navbar-favourites"
          >
            <IconFavourites />
          </Link>

          <Link
            to="shopping-cart"
            className="icon-container header__navbar-shopping-cart"
          >
            <IconShoppingCart />
          </Link>

          <button
            type="button"
            className="icon-container header__navbar-menu"
            onClick={() => setIsOpenSidebar(true)}
          >
            <IconMenu />
          </button>

          <button
            type="button"
            // eslint-disable-next-line max-len
            className="header__navbar-close icon-container icon-container--close"
            style={isOpenSidebar ? { right: 0 } : { right: '-49px' }}
            onClick={() => setIsOpenSidebar(false)}
          >
            <IconClose />
          </button>
        </div>
      </div>
    </header>
  );
});
