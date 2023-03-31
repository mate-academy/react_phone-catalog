import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const navigationLinks = ['', 'phones', 'tablets', 'accessories'];

export const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {navigationLinks.map(link => (
          <li className="nav__item" key={link}>
            <NavLink
              to={`/${link}`}
              replace
              className={({ isActive }) => classNames(
                'nav__link',
                { 'nav__link--active': isActive },
              )}
            >
              {link || 'home'}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
