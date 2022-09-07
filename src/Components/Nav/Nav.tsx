import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../Helpers/navItems';
import './Nav.scss';

export const Nav = () => (
  <nav className="Nav">
    <ul className="Nav__list">
      {navItems.map(({ link, name }) => (
        <NavLink
          to={link}
          className={({ isActive }) => {
            return classNames('link', { 'link--active': isActive });
          }}
          key={link}
        >
          <li className="Nav__item">
            {name}
          </li>
        </NavLink>
      ))}
    </ul>
  </nav>
);
