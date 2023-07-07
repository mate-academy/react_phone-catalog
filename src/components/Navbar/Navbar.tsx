import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import favorite from '../../assets/svg/heart.svg';
import cart from '../../assets/svg/cart.svg';
import hamburger from '../../assets/svg/hamburger_menu.svg';
import close from '../../assets/svg/close.svg';
import { Logo } from '../UI/Logo';
import { SearchBar } from '../UI/SearchBar/SearchBar';
import { NavbarCart } from './NavbarCart';
import { getClassNameForNavLink } from '../../helpers/stringOperations';
import { useCart } from '../../contexts/cartContext';
import { useFav } from '../../contexts/favContext';
import './Navbar.scss';

const isLinkActive = getClassNameForNavLink('nav__link');

const searchbarPathnames = [
  '/favorites',
  '/phones',
  '/tablets',
  '/accessories',
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { pathname } = useLocation();
  const isSearchBar = searchbarPathnames.includes(pathname);

  const { cartItems } = useCart();
  const { favItems } = useFav();

  const handleMenuButtonClick = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (pathname === '/cart') {
    return <NavbarCart cartCount={cartItems.length} />;
  }

  return (
    <nav className="nav">
      <Logo />

      <ul
        className={classNames('nav__list', {
          'nav__list--active': menuOpen,
        })}
      >
        <li className="nav__item">
          <NavLink className={isLinkActive} to="/home" title="Home">
            Home
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink className={isLinkActive} to="/phones" title="Phones">
            Phones
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink className={isLinkActive} to="/tablets" title="Tablets">
            Tablets
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink
            className={isLinkActive}
            to="/accessories"
            title="Accessories"
          >
            Accessories
          </NavLink>
        </li>
      </ul>

      <ul className="nav__list-icons">
        {isSearchBar && (
          <li className="nav__item">
            <SearchBar key={pathname} />
          </li>
        )}

        <li className="nav__item">
          <NavLink
            className={getClassNameForNavLink('nav__link', ' nav__link--icon')}
            to="/favorites"
            title="Favorites"
          >
            <img className="nav__icon" src={favorite} alt="Favorites" />
            <span className="nav__count">{favItems.length}</span>
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink
            className={getClassNameForNavLink('nav__link', ' nav__link--icon')}
            to="/cart"
            title="Cart"
          >
            <img className="nav__icon" src={cart} alt="Cart" />
            <span className="nav__count">{cartItems.length}</span>
          </NavLink>
        </li>

        <li className="nav__item nav__item--mobile">
          <button
            type="button"
            className="nav__menu-button"
            onClick={handleMenuButtonClick}
          >
            <img className="nav__icon" src={menuOpen ? close : hamburger} alt="Open nav menu" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
