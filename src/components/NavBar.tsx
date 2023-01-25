import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="nav header__nav">
      <ul className="nav__list">
        <NavLink
          className={({ isActive }) => `nav__link ${(isActive ? 'nav__link--active' : '')}`}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav__link ${(isActive ? 'nav__link--active' : '')}`}
          to="/phones"
        >
          Phones
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav__link ${(isActive ? 'nav__link nav__link--active' : '')}`}
          to="/tablets"
        >
          Tables
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav__link ${(isActive ? 'nav__link nav__link--active' : '')}`}
          to="/accessories"
        >
          Accessories
        </NavLink>
      </ul>
    </nav>
  );
};

export default NavBar;
