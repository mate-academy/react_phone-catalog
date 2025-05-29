import classNames from 'classnames';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCartValues } from '../../store/CartStore';
import { useFavouriteValues } from '../../store/FavouriteContext';
import { MobileMenu } from '../MobileMenu';
import logo from '../../../public/img/Logo.svg';
import React from 'react';

export const Header: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { cartCount } = useCartValues();
  const { favouritesCount } = useFavouriteValues();

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('header__nav--link', {
      'is-active': isActive,
    });
  };

  const getLinkClassIcon = ({ isActive }: { isActive: boolean }) => {
    return classNames('header__user--icon', {
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
          <img src={logo} alt="Logo" className="header__logo--img" />
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
            <img
              src="./img/favourite-icon.svg"
              alt="favourite"
              className="icon icon-user"
            />
          </NavLink>
          <NavLink
            data-count={cartCount !== 0 ? `${cartCount}` : ''}
            to="/cart"
            className={getLinkClassIcon}
          >
            <img
              src="./img/Shopping-cart.svg"
              alt="favourite"
              className="icon icon-user"
            />
          </NavLink>
        </div>
        <div className="header__menu">
          <button className="header__menu--icon" onClick={handleShowMenu}>
            <img
              src="./img/Menu.svg"
              alt="Menu icon"
              className="icon icon-menu"
            />
          </button>
        </div>
      </header>
      <MobileMenu
        isOpenMenu={isOpenMenu}
        handleCloseMenu={async () => setIsOpenMenu(false)}
      />
    </>
  );
};
