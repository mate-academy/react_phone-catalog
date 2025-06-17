import React, { useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCartValues } from '../../store/CartStore';
import { useFavouriteValues } from '../../store/FavouriteContext';
import { MobileMenu } from '../MobileMenu';
import classNames from 'classnames';
import logo from '/img/Logo.png';
import menuIcon from '/img/Menu.png';
import favouriteIcon from '/img/favourite-icon.png';
import cartIcon from '/img/Shopping-cart.png';

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
            src={logo} 
            alt="Logo" 
            className="header__logo--pict"
            width={80}
            height={32}
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
            data-count={favouritesCount !== 0 ? `${favouritesCount}` : ''}
            to="/favourites"
            className={getLinkClassIcon}
            aria-label="Favourites"
          >
            <img
              src={favouriteIcon}
              alt="favourite"
              className="icon icon-user"
              width={16}
              height={16}
              loading="eager"
            />
          </NavLink>
          <NavLink
            data-count={cartCount !== 0 ? `${cartCount}` : ''}
            to="/cart"
            className={getLinkClassIcon}
            aria-label="Cart"
          >
            <img
              src={cartIcon}
              alt="cart"
              className="icon icon-user"
              width={16}
              height={16}
              loading="eager"
            />
          </NavLink>
        </div>
        <div className="header__menu">
          <button className="header__menu--icon" onClick={handleShowMenu}>
            <img
              src={menuIcon}
              alt="Menu icon"
              className="icon icon-menu"
              width={16}
              height={16}
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
