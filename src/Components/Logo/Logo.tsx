import { NavLink } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => (
  <NavLink className="logo" to="/" replace>
    <img src="./img/logo/LOGO.svg" alt="logo" />
  </NavLink>
);
