import * as Router from 'react-router-dom';
import classNames from 'classnames';
import './Nav.scss';

export type NavLink = {
  path: string;
  display: string;
};

interface Props {
  navLinks: NavLink[];
}

export const Nav: React.FC<Props> = ({ navLinks }) => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {navLinks.map((navLink) => {
          const { path, display } = navLink;

          return (
            <li className="nav__item" key={path}>
              <Router.NavLink
                className={({ isActive }) => classNames('nav__link', {
                  'nav__link--active': isActive,
                })}
                to={path}
              >
                {display}
              </Router.NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
