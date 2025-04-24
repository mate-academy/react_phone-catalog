import { getActiveClass } from '../../utils/getActiveClass';
import './NavBar.scss';

import { NavLink } from 'react-router-dom';

const linkClass = getActiveClass('nav__link text__body--uppercase');

export const NavBar = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__list-item">
          <NavLink to="/" end className={linkClass}>
            home
          </NavLink>
        </li>

        <li className="nav__list-item">
          <NavLink to="/phones" className={linkClass}>
            phones
          </NavLink>
        </li>

        <li className="nav__list-item">
          <NavLink to="/tablets" className={linkClass}>
            tablets
          </NavLink>
        </li>

        <li className="nav__list-item">
          <NavLink to="/accessories" className={linkClass}>
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
