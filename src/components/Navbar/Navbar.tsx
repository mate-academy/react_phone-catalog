import { NavLink } from 'react-router-dom';
import './style/Navbar.scss';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        <span className="navbar__logo-image" />
      </NavLink>
      <ul className="navbar__navlist">
        <NavLink
          to="/"
          className="navbar__navlist-item font_uppercase is-active"
        >
          home
        </NavLink>

        <li className="navbar__navlist-item font_uppercase">
          <NavLink to="/"> phones </NavLink>
        </li>

        <li className="navbar__navlist-item font_uppercase">
          <NavLink to="/"> tablets </NavLink>
        </li>

        <li className="navbar__navlist-item font_uppercase">
          <NavLink to="/"> accessories </NavLink>
        </li>
      </ul>
    </nav>
  );
};
