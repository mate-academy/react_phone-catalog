import { NavLink } from 'react-router-dom';

export const Logo = () => (
  <div>
    <NavLink
      type="button"
      to="/"
      className="logo"
    >
      <img className="logo__image" src="./img/LOGO.png" alt="LOGO" />
    </NavLink>
  </div>
);
