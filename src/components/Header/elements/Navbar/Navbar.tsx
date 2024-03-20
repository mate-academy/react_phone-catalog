import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import '../../../../styles/utils.scss';
import { getLinkStyle } from '../../../../helpers/utils/getLinkStyle';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" style={getLinkStyle}>
        Home
      </NavLink>

      <NavLink to="/phones" style={getLinkStyle}>
        Phones
      </NavLink>

      <NavLink to="/tablets" style={getLinkStyle}>
        Tablets
      </NavLink>

      <NavLink to="/accessories" style={getLinkStyle}>
        Accesories
      </NavLink>
    </nav>
  );
};
