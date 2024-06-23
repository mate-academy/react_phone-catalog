import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../../helpers/getNavLinkClass';
import './Nav.scss';

export const Nav = () => {
  return (
    <nav className="nav">
      <NavLink className={getLinkClass} to="/">
        Home
      </NavLink>

      <NavLink className={getLinkClass} to="phones">
        Phones
      </NavLink>

      <NavLink className={getLinkClass} to="tablets">
        Tablets
      </NavLink>

      <NavLink className={getLinkClass} to="accessories">
        Accessories
      </NavLink>
    </nav>
  );
};
