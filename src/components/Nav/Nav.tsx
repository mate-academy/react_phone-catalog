import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const returnClass = ({ isActive }: { isActive: boolean }) => cn(
  'nav__link',
  { 'nav__link--active': isActive },
);

export const Nav = () => (
  <nav className="nav">
    <ul className="nav__list">
      <li className="nav__item">
        <NavLink to="/" className={returnClass}>
          home
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink to="/phones" className={returnClass}>
          phones
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink to="/tablets" className={returnClass}>
          tablets
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink to="/accessories" className={returnClass}>
          accessories
        </NavLink>
      </li>
    </ul>
  </nav>
);
