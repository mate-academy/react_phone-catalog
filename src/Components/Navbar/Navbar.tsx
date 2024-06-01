import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

export const Navbar = () => {
  const activeLink = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__item', {
      'navbar__item-active': isActive,
    });

  return (
    <nav className="navbar">
      <NavLink to="/" className={activeLink}>
        home
      </NavLink>
      <NavLink to="/phones" className={activeLink}>
        phones
      </NavLink>
      <NavLink to="/tablets" className={activeLink}>
        tablets
      </NavLink>
      <NavLink to="/accessories" className={activeLink}>
        accessories
      </NavLink>
    </nav>
  );
};
