import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const getLinkClass = (
  { isActive }: { isActive: boolean },
) => classNames('nav__link', {
  'nav__link--active': isActive,
});

export const NavBar = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <NavLink
          to="/"
          className={getLinkClass}
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={getLinkClass}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={getLinkClass}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={getLinkClass}
        >
          Accessories
        </NavLink>
      </ul>
    </nav>
  );
};
