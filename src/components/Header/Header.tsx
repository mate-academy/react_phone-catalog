import classNames from 'classnames';
import {
  Link, NavLink, useLocation,
} from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Search } from '../Search/Search';
import './Header.scss';
import './Nav.scss';

export const headerLinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Phones',
    path: '/phones',
  },
  {
    name: 'Tablets',
    path: '/tablets',
  },
  {
    name: 'Accessories',
    path: '/accessories',
  },
];

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'nav__link', {
    'nav__link--active': isActive,
  },
);

const getIconClass = ({ isActive }: { isActive: boolean }) => classNames(
  'icon__block', {
    'icon__block--active': isActive,
  },
);

export const Header = () => {
  const location = useLocation();
  const pageName = location.pathname
    .split('/')
    .filter((path) => path !== '')
    .join('');

  const favorites = useAppSelector((state) => state.favorites.favorites);
  const cart = useAppSelector((state) => state.cart.cart);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src="./img/icons/logo.svg" alt="logo" />
        </Link>
        <nav className="header__nav nav">
          <ul className="nav__list">
            {headerLinks.map(({ name, path }) => (
              <li className="nav__item" key={name}>
                <NavLink className={getLinkClass} to={path}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="header__right">
        {(pageName === 'phones'
          || pageName === 'tablets'
          || pageName === 'accessories'
          || pageName === 'favorites') && <Search pageName={pageName} />}

        <NavLink className={getIconClass} to="/favorites">
          <span className="icon icon--favorites" />
          {favorites.length > 0 && (
            <span className="icon__counter">{favorites.length}</span>
          )}
        </NavLink>
        <NavLink className={getIconClass} to="/cart">
          <span className="icon icon--cart" />
          {cart.length > 0 && (
            <span className="icon__counter">{cart.length}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
