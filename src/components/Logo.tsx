import { NavLink } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
  return (
    <NavLink
      to="/"
    >
      <div className="nav-logo" />
    </NavLink>
  );
};
