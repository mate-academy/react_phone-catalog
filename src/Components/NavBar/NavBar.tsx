import { NavLink } from 'react-router-dom';
import './nav.scss';
import cn from 'classnames';

const menuItems = [
  'phones',
  'tablets',
  'accessories',
];

const getActiveClass = ({ isActive }: { isActive: boolean }) => cn(
  'nav__link', { 'nav__link-active': isActive },
);

export const NavBar = () => {
  return (
    <>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              className={getActiveClass}
              to="/"
            >
              Home
            </NavLink>
          </li>
          {menuItems.map((item) => (
            <li
              key={item}
              className="nav__item"
            >
              <NavLink
                className={getActiveClass}
                to={`/${item}`}
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
