import React, { useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCartValues } from '../../store/CartStore';
import { useFavouriteValues } from '../../store/FavouriteContext';
import { MobileMenu } from '../MobileMenu';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { cartCount } = useCartValues();
  const { favouritesCount } = useFavouriteValues();

  const getLinkClass = useCallback(({ isActive }: { isActive: boolean }) => {
    return classNames('header__nav--link', {
      'is-active': isActive,
    });
  }, []);

  const getLinkClassIcon = useCallback(({ isActive }: { isActive: boolean }) => {
    return classNames('header__user--icon', {
      'is-active': isActive,
    });
  }, []);

  const handleShowMenu = useCallback(() => {
    setIsOpenMenu(current => !current);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsOpenMenu(false);
  }, []);

  return (
    <>
      <header className="header">
        <Link to="/" className="header__logo">
          <img 
            src="/img/Logo.png" 
            alt="Logo" 
            className="header__logo--pict"
            
            loading="eager"
          />
        </Link>
        <nav className="header__nav">
          <NavLink to="/" className={getLinkClass} end>
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
        </nav>
        <div className="header__user">
          <NavLink
            to="/favourites"
            className={getLinkClassIcon}
            aria-label="Favourites"
          >
            <span className="icon-badge-wrapper" data-count={favouritesCount !== 0 ? `${favouritesCount}` : ''}>
              <img
                src="/img/favourite-icon.png"
                alt="favourite"
                className="icon icon-user"
                loading="eager"
              />
            </span>
          </NavLink>
          <NavLink
            to="/cart"
            className={getLinkClassIcon}
            aria-label="Cart"
          >
            <span className="icon-badge-wrapper" data-count={cartCount !== 0 ? `${cartCount}` : ''}>
              <img
                src="/img/Shopping-cart.png"
                alt="cart"
                className="icon icon-user"
                loading="eager"
              />
            </span>
          </NavLink>
        </div>
        <div className="header__menu">
          <button className="header__menu--icon" onClick={handleShowMenu}>
            <img
              src="/img/Menu.png"
              alt="Menu icon"
              className="icon icon-menu"
             
              loading="eager"
            />
          </button>
        </div>
      </header>
      <MobileMenu
        isOpenMenu={isOpenMenu}
        handleCloseMenu={handleCloseMenu}
      />
    </>
  );
};
