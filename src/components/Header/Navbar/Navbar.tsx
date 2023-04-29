import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './Navbar.scss';

import { navLinks } from './constants';

const linkClasses = ({ isActive }: { isActive: boolean }) => cn(
  'link',
  'navbar__link',
  { active: isActive },
);

const Navbar = () => (
  <nav className="navbar">
    <ul className="navbar__list">
      {navLinks.map(({ value, href }) => (
        <li key={href} className="navbar__item">
          <NavLink className={linkClasses} to={href}>
            {value}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
