import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Nav } from './Nav';
import './Header.scss';
import { Logo } from '../UI/Logo/Logo';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Search } from '../Search';

export const Header = () => {
  const cart = useAppSelector(state => state.cart);
  const favorites = useAppSelector(state => state.favorites);
  const location = useLocation();

  const pathname = location.pathname.replace('/', '');

  const pages = [
    { title: 'Home', link: '/' },
    { title: 'Phones', link: '/phones' },
    { title: 'Tablets', link: '/tablets' },
    { title: 'Accessories', link: '/accessories' },
  ];

  const availableToSearch = ['phones', 'tablets', 'accessories', 'favorites'];

  return (
    <header className="header">
      <div className="header__nav">
        <Logo />
        <Nav pages={pages} />
      </div>
      <div className="header__icons">
        {availableToSearch.includes(pathname) && (
          <Search currentPage={pathname} />
        )}
        <NavLink
          to="/favorites"
          className={
            ({ isActive }) => classNames(
              'header__favorites',
              { 'header__favorites--active': isActive },
            )
          }
        >
          { favorites.length !== 0 && (
            <span
              className="header__favorites-quantity"
            >
              {favorites.length}
            </span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={
            ({ isActive }) => classNames(
              'header__cart',
              { 'header__cart--active': isActive },
            )
          }
        >
          { cart.length !== 0 && (
            <span className="header__cart-quantity">{cart.length}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
