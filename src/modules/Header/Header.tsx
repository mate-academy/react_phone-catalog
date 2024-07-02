/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, NavLink, useLocation } from 'react-router-dom';
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
import { FavoutitesContext } from '../../store/FavouritesContext';
import { SearchForm } from '../CategoryPage/SearchForm';

const getLinkClassCategory = ({ isActive }: { isActive: boolean }) =>
  classNames('header__nav-link navigation-title', {
    active: isActive,
  });

const getLinkClassCart = ({ isActive }: { isActive: boolean }) =>
  classNames('icon-wrapper header__navbar-added-to', {
    active: isActive,
  });

export const Header: React.FC = React.memo(() => {
  const { isOpenSidebar, setIsOpenSidebar } = useContext(SidebarContext);
  const { shoppingList } = useContext(ShoppingCartContext);
  const { favouritesList } = useContext(FavoutitesContext);

  const { pathname } = useLocation();
  const category =
    pathname.slice(1) === 'phones' ||
    pathname.slice(1) === 'tablets' ||
    pathname.slice(1) === 'accessories';
  const isProductPage = pathname.split('/')[2];

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

        <div className="header__search">
          {!!category && !isProductPage && <SearchForm />}
        </div>

        <div className="header__switch-theme">
          <div className="header__switcher" />
        </div>

        <div className="header__navbar-icons">
          <NavLink to="favourites" className={getLinkClassCart}>
            <IconFavourites />
            {favouritesList.length > 0 && (
              <div className="header__navbar-added">
                {favouritesList.length}
              </div>
            )}
          </NavLink>

          <NavLink to="shopping-cart" className={getLinkClassCart}>
            <IconShoppingCart />
            {shoppingList.length > 0 && (
              <div className="header__navbar-added">{shoppingList.length}</div>
            )}
          </NavLink>

          <button
            type="button"
            className="icon-wrapper header__navbar-menu"
            onClick={() => setIsOpenSidebar(true)}
          >
            <IconMenu />
          </button>

          <button
            type="button"
            className="header__navbar-close
              icon-wrapper icon-wrapper--close"
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
