import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './Header.scss';
import { Search } from '../Search/Search';
import { StorContext } from '../../context/StorContext';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'header__nav-link', { 'header__is-active': isActive },
);

export const Header = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  const { inCartCount, favCount } = useContext(StorContext);
  const exit = useRef<HTMLButtonElement>(null);
  const [burger, setBurger] = useState(false);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target !== exit.current) {
        setBurger(false);
      }
    });
    setBurger(false);
  }, [location]);

  const visualSearch = pathname === '/phones'
    || pathname === '/accessories'
    || pathname === '/tablets'
    || pathname === '/favourites';

  return (
    <div className="header">
      <div className="header__link-container">
        <div className="header__logo">
          <Link to="/">
            <img
              src="img/mine/LOGO.svg"
              alt="Logo"
              className="header__logo_img"
            />
          </Link>
        </div>

        <nav className={classNames(
          'header__nav',
          { 'header__nav--disable': !burger },
        )}
        >
          <div className="header__nav-item">
            <NavLink to="/" className={getLinkClass}>
              HOME
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to="/phones" className={getLinkClass}>
              PHONES
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to="/tablets" className={getLinkClass}>
              TABLETS
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to="/accessories" className={getLinkClass}>
              ACCESSORIES
            </NavLink>
          </div>
        </nav>

      </div>

      <div className="header__container">

        {visualSearch && (
          <div className="header__search">
            <Search />
          </div>
        )}

        <div className="header__icons">
          <NavLink to="/favourites" className={getLinkClass}>
            <img
              src="img/mine/icons/Favourites (Heart Like).svg"
              alt="Like"
            />

            {favCount !== 0
              && (
                <span className="header__icons--count">
                  {favCount}
                </span>
              )}
          </NavLink>
        </div>

        <div className="header__icons">
          <NavLink to="/cart" className={getLinkClass}>
            <img src="img/mine/icons/Shopping bag (Cart).svg" alt="Cart" />

            {inCartCount !== 0
              && (
                <span className="header__icons--count">
                  {inCartCount}
                </span>
              )}
          </NavLink>
        </div>

        <div className="header__icons burger">
          <button
            type="button"
            ref={exit}
            className="header__burger"
            onClick={() => {
              setBurger(!burger);
            }}

          >
            {!burger && (
              <span className="header__menu header__menu--open" />
            )}

            {burger && (
              <span className="header__menu header__menu--close" />
            )}

          </button>
        </div>
      </div>
    </div>
  );
};
