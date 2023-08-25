import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { SearchForm } from './SearchForm';
import { Logo } from '../Logo/Logo';

export const NavBar = () => {
  const location = useLocation();
  const shouldShowSearchForm = location.pathname !== '/';

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <Logo />

        <NavLink
          to="/"
          className={classNames('navbar__item', {
            'navbar__item--active': location.pathname === '/',
          })}
        >
          home
        </NavLink>

        <NavLink
          to="/phones"
          className={classNames('navbar__item', {
            'navbar__item--active': location.pathname === '/phones',
          })}
        >
          phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={classNames('navbar__item', {
            'navbar__item--active': location.pathname === '/tablets',
          })}
        >
          tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={`navbar__item ${location.pathname === '/accessories' ? 'navbar__item--active' : ''}`}
        >
          accessories
        </NavLink>
      </ul>

      <div className="navbar__icons">
        {shouldShowSearchForm && <SearchForm />}

        <Link to="/" className="navbar__icon">
          <div className="navbar__icon--favs" />
        </Link>

        <Link to="/" className="navbar__icon">
          <div className="navbar__icon--cart" />
        </Link>
      </div>
    </nav>
  );
};
