import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.scss';
import navLogo from './NavbarImg/NavLogo.svg';
import navMenu from './NavbarImg/Menu.svg';
import basket from './NavbarImg/Shopping bag (Cart).svg';
import favorite from './NavbarImg/Vector (Stroke).svg';
import close from './NavbarImg/Close.svg';
import { useEffect, useState } from 'react';
import { useCart } from '../../components/Context/CartContext';
import { useFavorites } from '../../components/Context/FavoriteContext';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { favorites } = useFavorites();

  const cartCount = cart.reduce((sum, row) => sum + row.quantity, 0);
  const favCount = favorites.length;

  const toggleMenu = () => {
    const next = !isMenuOpen;

    setIsMenuOpen(next);
    document.body.classList.toggle('menu-open', next);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  const location = useLocation();

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <nav
      id="top"
      className={classNames('navbar', {
        'navbar--open': isMenuOpen,
      })}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar__top">
        <img src={navLogo} alt="Logo" className="navbar__logo" />
        <div className="navbar__iconBox">
          <img
            src={isMenuOpen ? close : navMenu}
            alt="Menu"
            className="navbar__icon"
            onClick={toggleMenu}
          />
        </div>
      </div>
      <menu className={classNames('navbar__menu', { 'is-open': isMenuOpen })}>
        <div className="container">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return classNames('navbar__link', {
                'navbar__link--active': isActive,
              });
            }}
            onClick={closeMenu}
          >
            HOME
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) => {
              // eslint-disable-next-line prettier/prettier, max-len
              return classNames('navbar__link', {
                'navbar__link--active': isActive,
              });
            }}
            onClick={closeMenu}
          >
            PHONES
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) => {
              // eslint-disable-next-line prettier/prettier, max-len
              return classNames('navbar__link', {
                'navbar__link--active': isActive,
              });
            }}
          >
            TABLETS
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) => {
              // eslint-disable-next-line prettier/prettier, max-len
              return classNames('navbar__link', {
                'navbar__link--active': isActive,
              });
            }}
          >
            ACCESSORIES
          </NavLink>
        </div>
        <div className="wrap">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames('navbar__icon-link', {
                'navbar__icon-link--active': isActive,
              })
            }
          >
            <div className="navbar__icon-wrapper">
              <img
                src={favorite}
                alt="Favorite"
                className="navbar__icon-action"
              />
              {favCount > 0 && (
                <span className="navbar__badge">{favCount}</span>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames('navbar__icon-link', {
                'navbar__icon-link--active': isActive,
              })
            }
          >
            <div className="navbar__icon-wrapper">
              <img src={basket} alt="Cart" className="navbar__icon-action" />
              {cartCount > 0 && (
                <span className="navbar__badge">{cartCount}</span>
              )}
            </div>
          </NavLink>
        </div>
      </menu>
    </nav>
  );
};
