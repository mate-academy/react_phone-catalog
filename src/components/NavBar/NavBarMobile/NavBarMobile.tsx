import { NavLink } from 'react-router-dom';
import { getNavLinkClass } from '../NavBar';
import './NavBarMobile.scss';
import classNames from 'classnames';

export const NavBarMobile = () => {
  return (
    <aside className="mobile-menu navbar__mobile-menu" id="menu">
      <div className="mobile-menu__topbar">
        <a href="#" className="topbar__logo-link">
          <img
            className="topbar__logo-image"
            src="./img/logo/logo-nice-gadgets.svg"
            alt="LOGO"
          />
        </a>
        {/* <a href="#" className="navbar-button1 button__close"></a> */}
        <a href="#" className="navbar-button1 button__close"></a>
      </div>

      <div className="mobile-menu__links">
        <ul className="mobile-menu__items">
          <li className="mobile-menu__item">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
          </li>
          <li className="mobile-menu__item">
            <NavLink to="/phones" className={getNavLinkClass}>
              Phones
            </NavLink>
          </li>
          <li className="mobile-menu__item">
            <NavLink to="/tablets" className={getNavLinkClass}>
              Tablets
            </NavLink>
          </li>
          <li className="mobile-menu__item">
            <NavLink to="/accessories" className={getNavLinkClass}>
              Accessories
            </NavLink>
          </li>
        </ul>

        <div className="mobile-menu__buttons">
          <NavLink
            to="/favourite"
            className={({ isActive }) =>
              classNames('mobile-menu-button button__favourite', {
                'active-navlink': isActive,
              })
            }
          />
          <NavLink
            to="/basket"
            className={({ isActive }) =>
              classNames('mobile-menu-button button__basket', {
                'active-navlink': isActive,
              })
            }
          />
        </div>
      </div>
    </aside>
  );
};
