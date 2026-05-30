import { NavLink } from 'react-router-dom';
import './Navbar.scss';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'navbar__link is-active' : 'navbar__link'
            }
          >
            Home
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive ? 'navbar__link is-active' : 'navbar__link'
            }
          >
            Phones
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              isActive ? 'navbar__link is-active' : 'navbar__link'
            }
          >
            Tablets
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive ? 'navbar__link is-active' : 'navbar__link'
            }
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
