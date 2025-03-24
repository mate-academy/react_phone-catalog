import React, { useState } from 'react';
// import './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { MobileMenu } from '../MobileMenu';
import { useCartValues } from '../../store/CartContext';
import { useFavouriteValues } from '../../store/FavouriteContext';

export const Header: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { cartCount } = useCartValues();
  const { favouritesCount } = useFavouriteValues();

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return cn('header__nav--link', {
      'is-active': isActive,
    });
  };

  const getLinkClassIcon = ({ isActive }: { isActive: boolean }) => {
    return cn('header__user--icon', {
      'is-active': isActive,
    });
  };

  const handleShowMenu = () => {
    setIsOpenMenu(current => !current);
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="header__logo">
          <img src="/img/Logo.svg" alt="Logo" className="header__logo--pict" />
        </Link>
        <nav className="header__nav">
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
        </nav>
        <div className="header__user">
          <NavLink
            data-count={favouritesCount !== 0 ? `${favouritesCount}` : ''}
            to="/favourites"
            className={getLinkClassIcon}
          >
            <svg className="icon icon-user">
              <use href="img/icons.svg#icon-favourites"></use>
            </svg>
          </NavLink>
          <NavLink
            data-count={cartCount !== 0 ? `${cartCount}` : ''}
            to="/cart"
            className={getLinkClassIcon}
          >
            <svg className="icon icon-user">
              <use href="img/icons.svg#icon-shopping-bag"></use>
            </svg>
          </NavLink>
        </div>
        <div className="header__menu">
          <button className="header__menu--icon" onClick={handleShowMenu}>
            <svg className="icon icon-menu">
              <use href="img/icons.svg#icon-menu"></use>
            </svg>
          </button>
        </div>
      </header>
      <MobileMenu
        isOpenMenu={isOpenMenu}
        handleCloseMenu={() => setIsOpenMenu(false)}
      />
    </>
  );
};
