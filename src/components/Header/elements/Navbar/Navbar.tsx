import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import '../../../../styles/utils.scss';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar__link', {
    'link-active': isActive,
  });

export const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={getLinkClass}>
        Home
      </NavLink>

      <NavLink to="/phones" className={getLinkClass}>
        Phones
      </NavLink>

      <NavLink to="/tablets" className={getLinkClass}>
        Tablets
      </NavLink>

      <NavLink to="/accessories" className={getLinkClass}>
        Accesories
      </NavLink>
    </nav>
  );
};
