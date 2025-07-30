import { NavLink } from 'react-router-dom';
import logoLight from '../../images/logo.svg';
import './Logo.scss';

const closeMenu = () => {
  const checkbox = document.getElementById('menu-toggle') as HTMLInputElement;
  if (checkbox) checkbox.checked = false;
};

export const Logo = () => (
  <NavLink
    to="/"
    className="header__logo"
    onClick={closeMenu}
  >
    <img
      className="logo"
      src={logoLight}
      alt="Shop logo"
    />
  </NavLink>
);
