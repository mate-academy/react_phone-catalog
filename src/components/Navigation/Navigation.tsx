import './Navigation.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navigation = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
    'navigation__link', { 'navigation__link-active': isActive },
  );

  return (
    <nav className="navigation">
      <NavLink to="/" className={getLinkClass}>Home</NavLink>
      <NavLink to="/phones" className={getLinkClass}>Phones</NavLink>
      <NavLink to="/tablets" className={getLinkClass}>Tablets</NavLink>
      <NavLink to="/accessories" className={getLinkClass}>Accessories</NavLink>
    </nav>
  );
};
