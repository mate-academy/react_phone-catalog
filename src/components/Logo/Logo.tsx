import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Logo.scss';

export const Logo = () => (
  <NavLink to="/">
    <img
      src={logo}
      alt="Logo"
      className="Logo"
    />
  </NavLink>
);
