import cn from 'classnames';
import { Link, NavLink } from 'react-router-dom';

import './index.scss';
import { LOGO } from '../../images';

const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
  cn('nav__item__link', { 'nav__item__link--active': isActive });

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      role="navigation"
      aria-label="main navigation"
      className="nav"
    >
      <ul className="nav__list">
        <li className="nav__logo__link">
          <Link to="/">
            <img src={LOGO} alt="Logo" className="nav__logo" />
          </Link>
        </li>
        <li className="nav__item">
          <NavLink className={navLinkStyle} to="/">
            Home
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink className={navLinkStyle} to="/phones">
            Phones
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink className={navLinkStyle} to="/tablets">
            Tables
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink className={navLinkStyle} to="/accessories">
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
