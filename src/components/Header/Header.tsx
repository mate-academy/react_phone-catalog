import classNames from 'classnames';
import { useContext } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { CatalogContext } from '../../context';
import { Search } from '../Search';
import './header.scss';

export const Header = () => {
  const { favorites, cart } = useContext(CatalogContext);
  const { pathname } = useLocation();

  return (
    <header className="header" id="header">
      <Link to="/">
        <img src="./logo.svg" alt="logo" />
      </Link>

      <nav
        className="header__nav nav"
        style={{ display: pathname === '/cart' ? 'none' : 'block' }}
      >
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              to="/home"
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--active': isActive },
              )}
            >
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/phones"
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--active': isActive },
              )}
            >
              Phones
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/tablets"
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--active': isActive },
              )}
            >
              Tablets
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/accessories"
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--active': isActive },
              )}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/favorites" element={<Search />} />
        <Route path="/phones" element={<Search />} />
        <Route path="/tablets" element={<Search />} />
        <Route path="/accessories" element={<Search />} />
      </Routes>

      <Link
        className={classNames(
          'header__icon',
          { 'icon__favor--items': !!favorites.length },
        )}
        to="/favorites"
        style={{ display: pathname === '/cart' ? 'none' : 'flex' }}
      >
        <img
          className="header__img"
          src="./img/icons/favourites.svg"
          alt="favourites"
        />

        {!!favorites.length && (
          <span className="header__countLabel">{favorites.length}</span>
        )}
      </Link>

      <Link className="header__icon" to="/cart">
        <img src="./img/icons/cart.svg" alt="cart" />

        {!!cart.length && (
          <span className="header__countLabel">{cart.length}</span>
        )}
      </Link>
    </header>
  );
};
