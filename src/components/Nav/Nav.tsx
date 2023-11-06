import { NavLink } from 'react-router-dom';
import './Nav.scss';

export const Nav = () => {
  return (
    <nav className="Nav">
      <NavLink
        to="/"
        className="Nav__item"
      >
        Home
      </NavLink>

      <NavLink
        to="/phones"
        className="Nav__item"
      >
        Phones
      </NavLink>

      <NavLink
        to="/tablets"
        className="Nav__item"
      >
        Tablets
      </NavLink>

      <NavLink
        to="/accessories"
        className="Nav__item"
      >
        Accessories
      </NavLink>
    </nav>
  );
};
