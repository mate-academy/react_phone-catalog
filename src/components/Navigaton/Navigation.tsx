import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './style.scss';

const getLinkClass = (
  { isActive }: { isActive: boolean },
) => classNames('navbar-item', {
  'navbar-item--active': isActive,
});

export const Navigation = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={getLinkClass}>
        Home
      </NavLink>

      <NavLink to="/phones" end className={getLinkClass}>
        Phones
      </NavLink>

      <NavLink to="/tablets" className={getLinkClass}>
        Tablets
      </NavLink>

      <NavLink to="/accessories" className={getLinkClass}>
        Accessories
      </NavLink>
    </nav>
  );
};
