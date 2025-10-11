import './header.scss';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  setBreadcrumbs: (x: string) => void
}

export const Header = () => {

  return (
    <header className="header">
      <NavLink to="/" className="header__logo">
        <img
          src="../../../public/img/logo/Logo.svg"
          alt="logo"
          className="header__logo__image"
        />
      </NavLink>

      <nav className="header__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `header__nav__link ${isActive ? 'is-active' : ''}`
          }
        >
          home
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            `header__nav__link ${isActive ? 'is-active' : ''}`
          }
        >
          phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            `header__nav__link ${isActive ? 'is-active' : ''}`
          }
        >
          tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            `header__nav__link ${isActive ? 'is-active' : ''}`
          }
        >
          accessories
        </NavLink>
      </nav>

      <div className="header__icons">
        <NavLink to="/favourites" className="header__icons--favourites" />
        <NavLink to="/cart" className="header__icons--bag" />
      </div>
    </header>
  );
};
