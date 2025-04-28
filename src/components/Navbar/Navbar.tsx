import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Navbar.scss';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getLinkClass}>
            HOME
          </NavLink>

          <NavLink to="/phones" className={getLinkClass}>
            PHONES
          </NavLink>

          <NavLink to="/tablets" className={getLinkClass}>
            TABLETS
          </NavLink>

          <NavLink to="/accessories" className={getLinkClass}>
            ACCESSORIES
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
