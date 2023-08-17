import { Link, NavLink, useLocation } from 'react-router-dom';

import { SearchForm } from './SearchForm';
import { Logo } from '../Logo/Logo';

export const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <Logo />

        <NavLink
          to="/"
          className={`navbar__item ${location.pathname === '/' ? 'navbar__item--active' : ''}`}
        >
          home
        </NavLink>

        <NavLink
          to="/phones"
          className={`navbar__item ${location.pathname === '/phones' ? 'navbar__item--active' : ''}`}
        >
          phones
        </NavLink>

        <NavLink
          to="/accessories"
          className={`navbar__item ${location.pathname === '/accessories' ? 'navbar__item--active' : ''}`}
        >
          accessories
        </NavLink>
      </ul>

      <div className="navbar__icons">
        <SearchForm />

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
