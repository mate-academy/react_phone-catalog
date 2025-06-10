import { NavLink } from 'react-router-dom';

export const Header = () => (
  <nav>
    <NavLink to="/" end>
      Home
    </NavLink>
    <NavLink to="/phones">Phones</NavLink>
    <NavLink to="/tablets">Tablets</NavLink>
    <NavLink to="/accessories">Accessories</NavLink>
  </nav>
);

export default Header;
