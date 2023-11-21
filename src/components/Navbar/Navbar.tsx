import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './Navbar.scss';

function getClassName({ isActive }: { isActive: boolean }) {
  return cn('Navbar__link', {
    'Navbar__link--active': isActive,
  });
}

export const Navbar = () => {
  return (
    <nav className="Navbar">
      <NavLink to="/" className={getClassName}>Home</NavLink>
      <NavLink to="/phones" className={getClassName}>Phones</NavLink>
      <NavLink to="/tablets" className={getClassName}>Tablets</NavLink>
      <NavLink to="/accessories" className={getClassName}>Accessories</NavLink>
    </nav>
  );
};
