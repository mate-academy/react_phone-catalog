import { NavLink } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => (
  <NavLink to="/" className="Logo">
    <img src="./img/logo.svg" alt="Logo" />
  </NavLink>
);
