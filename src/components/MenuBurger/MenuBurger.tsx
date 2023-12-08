import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Menu.scss';

export const MenuBurger = () => {
  const getLinkClass = ({ isActive }:{ isActive: boolean }) => classNames(
    'menu__link', {
      'menu__link-active': isActive,
    },
  );

  return (
    <header className="menu">
      <nav className="menu__nav">
        <div className="menu__main">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            Accessories
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
