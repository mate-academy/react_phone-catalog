import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FavContext } from '../../context/FavContext';
import { CartContext } from '../../context/CartContext';

import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import { Search } from '../Search';
import { Counter } from '../Counter/Counter';
import favIcon from '../../images/icons/Favourites.svg';
import cartIcon from '../../images/icons/Shopping_cart.svg';
import menuIcon from '../../images/icons/icon-menu.svg';
import closeIcon from '../../images/icons/icon-close.svg';
import './Header.scss';
import '../../App.scss';

const getClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('Navbar__button', {
    'Navbar__button--active': isActive,
  });
};

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { fav } = useContext(FavContext);
  const { cart } = useContext(CartContext);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <>
      <div className="Header" id="header">
        <div className="Header__content">
          <div className="Header__logo-and-nav">
            <Logo />

            {pathname !== '/cart' && <Navbar />}
          </div>

          <div className="Header__fav-and-cart">
            {(pathname === '/phones'
              || pathname === '/tablets'
              || pathname === '/accessories'
              || pathname === '/favorites') && (
              <div className="Header__search">
                <Search />
              </div>
            )}

            {pathname !== '/cart' && (
              <NavLink to="/favorites" className={getClassName}>
                <div className="Action">
                  <img src={favIcon} alt="Favorites" className="Action__img" />
                  {!!fav.length && <Counter count={fav.length} />}
                </div>
              </NavLink>
            )}

            <NavLink to="/cart" className={getClassName}>
              <div className="Action">
                <img
                  src={cartIcon}
                  alt="Shopping cart"
                  className="Action__img"
                />
                {!!cart.length && <Counter count={cart.length} />}
              </div>
            </NavLink>

            <button
              type="button"
              aria-label="menu"
              className="Header__menu-button"
              onClick={() => setIsMenuOpened(true)}
            >
              <img
                src={menuIcon}
                alt="Menu"
                className="Header__menu-button-img"
              />
            </button>
          </div>
        </div>
      </div>

      <aside
        className={classNames('Menu', {
          'Menu--opened': isMenuOpened,
        })}
      >
        <div className="Menu__actions">
          <Logo />
          <button
            type="button"
            aria-label="menu"
            className="menu__button"
            onClick={() => setIsMenuOpened(false)}
          >
            <img src={closeIcon} alt="Menu" className="menu__img" />
          </button>
        </div>

        <nav className="Menu__nav">
          <ul className="Menu__nav-list">
            <li className="Menu__nav-link">
              <NavLink
                to="/"
                className="Menu__nav-item"
                onClick={() => setIsMenuOpened(false)}
              >
                Home
              </NavLink>
            </li>

            <li className="Menu__nav-link">
              <NavLink
                to="/phones"
                className="Menu__nav-item"
                onClick={() => setIsMenuOpened(false)}
              >
                Phones
              </NavLink>
            </li>

            <li className="Menu__nav-link">
              <NavLink
                to="/tablets"
                className="Menu__nav-item"
                onClick={() => setIsMenuOpened(false)}
              >
                Tablets
              </NavLink>
            </li>

            <li className="Menu__nav-link">
              <NavLink
                to="/accessories"
                className="Menu__nav-item"
                onClick={() => setIsMenuOpened(false)}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
