import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn({
    'is-active': isActive,
  });
};

const routes = [
  { path: '/', label: 'Home' },
  { path: '/phones', label: 'Phones' },
  { path: '/tablets', label: 'Tablets' },
  { path: '/accessories', label: 'Accessories' },
];

export const NavBar = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {routes.map(({ path, label }) => (
          <li key={path} className="nav__link">
            <NavLink
              to={path}
              className={({ isActive }) => getLinkClass({ isActive })}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
