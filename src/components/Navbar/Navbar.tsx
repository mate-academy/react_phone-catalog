import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('nav__link', {
      'nav__link-active': isActive,
    });

  return (
    <nav className="nav">
      <NavLink to="/" className={getLinkClass}>
        HOME
      </NavLink>
      <NavLink to="phones" className={getLinkClass}>
        PHONES
      </NavLink>
      <NavLink to="tablets" className={getLinkClass}>
        TABLETS
      </NavLink>
      <NavLink to="/accessories" className={getLinkClass}>
        ACCESSORIES
      </NavLink>
    </nav>
  );
};
