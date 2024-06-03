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
import { getLogo } from '../../services/getLogo';
import { ShoppingCartContext } from '../../store/ShoppingCartContext';

const getLinkClassCategory = ({ isActive }: { isActive: boolean }) =>
  classNames('header__nav-link navigation-title', {
    active: isActive,
  });

const getLinkClassCart = ({ isActive }: { isActive: boolean }) =>
  classNames('icon-container header__navbar-added-to', {
    active: isActive,
  });

export const Header: React.FC = React.memo(() => {
  const { isOpenSidebar, setIsOpenSidebar } = useContext(SidebarContext);
  const { shoppingList } = useContext(ShoppingCartContext);

  return (
    <header className="header">
      <div className="header__container">
        <Link
          to="/"
          className="header__logo-link"
          onClick={() => setIsOpenSidebar(false)}
        >
          <img src={getLogo().logo} alt="logo" className="header__logo logo" />
        </Link>

        <div className="header__nav">
          <NavLink to="/" className={getLinkClassCategory}>
            Home
          </NavLink>

          <NavLink to="phones" className={getLinkClassCategory}>
            Phones
          </NavLink>

          <NavLink to="tablets" className={getLinkClassCategory}>
            Tablets
          </NavLink>

          <NavLink to="accessories" className={getLinkClassCategory}>
            Accessories
          </NavLink>
        </div>

        <div className="header__navbar-icons icons-wrapper">
          <NavLink to="favourites" className={getLinkClassCart}>
            <IconFavourites />
            <div className="header__navbar-added">?</div>
          </NavLink>

          <NavLink to="shopping-cart" className={getLinkClassCart}>
            <IconShoppingCart />
            {shoppingList.length > 0 && (
              <div className="header__navbar-added">{shoppingList.length}</div>
            )}
          </NavLink>

          <button
            type="button"
            className="icon-container header__navbar-menu"
            onClick={() => setIsOpenSidebar(true)}
          >
            <IconMenu />
          </button>

          <button
            type="button"
            className="header__navbar-close
              icon-container icon-container--close"
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
