import { NavLink } from 'react-router-dom';
import './logo.scss';

export const Logo = () => {
  return (
    <NavLink to="/" className="logo-link">
      <img
        src="/src/shared/ui/icons/logo.svg"
        alt=""
        aria-hidden="true"
        className="logo-img"
      />
    </NavLink>
  );
};
