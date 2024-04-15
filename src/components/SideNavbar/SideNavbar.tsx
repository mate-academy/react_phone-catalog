import { NavLink } from 'react-router-dom';
import './SideNavbar.scss';

import React, { SetStateAction, useContext } from 'react';
import classNames from 'classnames';
import { FavouritesContext } from '../../context/favouritesContext';
import { CartContext } from '../../context/cartContext';
import { Logo } from '../Logo';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const SideNavbar: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { favourites } = useContext(FavouritesContext);
  const { cartList } = useContext(CartContext);
  const productsInCart = cartList.reduce((acc, item) => acc + item.quantity, 0);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-link', {
      'navbar-link-active': isActive,
    });

  const getFooterLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__footer-button', {
      'navbar__footer-button-active': isActive,
    });

  return (
    <div
      className={classNames({
        navbar: isMenuOpen === true,
        disabled: !isMenuOpen,
      })}
    >
      <div className="navbar__top">
        <Logo />
        <div
          className="header__menu-button"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="header__menu-button icon icon-close" />
        </div>
      </div>

      <nav className="navbar__list">
        <NavLink
          to="/"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          HOME
        </NavLink>
        <NavLink
          to="phones"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          PHONES
        </NavLink>
        <NavLink
          to="tablets"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          TABLETS
        </NavLink>
        <NavLink
          to="/accessories"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          ACCESSORIES
        </NavLink>
      </nav>

      <div className="navbar__footer">
        <NavLink
          to="favourites"
          className={getFooterLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="navbar__footer-button-fav icon">
            {favourites.length > 0 && (
              <p className="navbar__footer-counter icon">{favourites.length}</p>
            )}
          </div>
        </NavLink>
        <NavLink
          to="cart"
          className={getFooterLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="navbar__footer-button-cart icon">
            {cartList.length > 0 && (
              <p className="navbar__footer-counter icon">{productsInCart}</p>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
