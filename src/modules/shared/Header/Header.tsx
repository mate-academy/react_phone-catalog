import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { SidebarContext } from '../../../store/SidebarContext';

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
            <img
              src="/img/icons/favourites.svg"
              alt="favourites"
              className="icon icon-favourites"
            />
          </Link>

          <Link
            to="shopping-cart"
            className="icon-container header__navbar-shopping-cart"
          >
            <img
              src="/img/icons/shopping-cart.svg"
              alt="shoping cart"
              className="icon icon--shopping-cart"
            />
          </Link>

          <button
            type="button"
            className="icon-container header__navbar-menu"
            onClick={() => setIsOpenSidebar(true)}
          >
            <img
              src="/img/icons/menu.svg"
              alt="menu"
              className="icon icon--menu"
            />
          </button>

          <button
            type="button"
            // eslint-disable-next-line max-len
            className="header__navbar-close icon-container icon-container--close"
            style={isOpenSidebar ? { right: 0 } : { right: '-49px' }}
            onClick={() => setIsOpenSidebar(false)}
          >
            <img
              src="/img/icons/close.svg"
              alt="close"
              className="icon icon--close"
            />
          </button>
        </div>
      </div>
    </header>
  );
});
