import './Header.scss';
import {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { CartContext } from '../contexts/CartContextProvider';
import { FavContext } from '../contexts/FavContextProvider';
import { Search } from '../Search/Search';
import logo from '../../images/LOGO.svg';
import favImg from '../../images/Icons/Favourites_Heart-Like.svg';
import cartImg from '../../images/Icons/Shopping-bag_Cart.svg';
import burgerMenu from '../../images/Icons/Icon-Burger-menu.svg';
import buttonClose from '../../images/Icons/Close_black.svg';

export const Header = () => {
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavContext);
  const location = useLocation();
  const { pathname } = location;
  const [isOpen, setIsOpen] = useState(false);
  const navMenuRef = useRef<HTMLDivElement | null>(null);

  const isPathPhones = pathname === '/phones';
  const isPathFav = pathname === '/favourites';
  const isPathTablets = pathname === '/tablets';
  const isPathAccessories = pathname === '/accessories';

  const toggleHeaderMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navMenuRef.current
        && !navMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className="header header--margin-bottom">
      <div className="header__nav">
        <button
          className="header__button header__button--open"
          type="button"
          onClick={toggleHeaderMenu}
        >
          <img
            className="header__button-img"
            src={burgerMenu}
            alt={burgerMenu}
          />
        </button>

        <div className="header__logo">
          <Link
            className="header__logo-link"
            to="/"
          >
            <img
              src={logo}
              alt="logo"
            />
          </Link>

        </div>

        <div
          className={classNames('header__nav-menu', {
            'header__nav-menu--active': !isOpen,
          })}
          ref={navMenuRef}
        >
          <button
            className="header__button header__button--close"
            type="button"
            onClick={toggleHeaderMenu}
          >
            <img
              className="header__button-img"
              src={buttonClose}
              alt={buttonClose}
            />
          </button>

          <NavLink
            className={({ isActive }) => classNames(
              'header__link',
              'header__main-nav-link',
              {
                'header__main-nav-link--is-active': isActive,
              },
            )}
            to="/"
          >
            home
          </NavLink>

          <NavLink
            className={({ isActive }) => classNames(
              'header__link',
              'header__main-nav-link',
              {
                'header__main-nav-link--is-active': isActive,
              },
            )}
            to="/phones"
          >
            phones
          </NavLink>

          <NavLink
            className={({ isActive }) => classNames(
              'header__link',
              'header__main-nav-link',
              {
                'header__main-nav-link--is-active': isActive,
              },
            )}
            to="/tablets"
          >
            tablets
          </NavLink>

          <NavLink
            className={({ isActive }) => classNames(
              'header__link',
              'header__main-nav-link',
              {
                'header__main-nav-link--is-active': isActive,
              },
            )}
            to="/accessories"
          >
            accessories
          </NavLink>
        </div>

      </div>

      <div className="header__choosed">
        {(isPathPhones || isPathTablets || isPathAccessories || isPathFav) && (
          <Search />
        )}

        <NavLink
          className={({ isActive }) => classNames(
            'header__link',
            'header__actions-link',
            'header__favourites',
            'header__icon',
            {
              'header__actions-link--is-active': isActive,
            },
          )}
          to="favourites"
        >
          <img
            src={favImg}
            alt="favourites"
          />

          {favourites.length > 0 && (
            <div className="header__icon-count">
              {favourites.length}
            </div>
          )}
        </NavLink>

        <NavLink
          className={({ isActive }) => classNames(
            'header__link',
            'header__actions-link',
            'header__cart',
            'header__icon',
            {
              'header__actions-link--is-active': isActive,
            },
          )}
          to="cart"
        >
          <img
            src={cartImg}
            alt="cart"
          />
          {cart.length > 0 && (
            <div className="header__icon-count">
              {cart.length}
            </div>
          )}
        </NavLink>
      </div>
    </header>
  );
};
