import { Link, NavLink } from 'react-router-dom';
import './NavBar.scss';
import classNames from 'classnames';

export function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('links__item-link', { 'active-navlink': isActive });
}

export const NavBar = () => {
  return (
    <>
      <nav className="navbar" id="navbar">
        <Link to="/" className="navbar__logo">
          <img
            className="navbar__logo-image"
            src="./img/logo/logo-nice-gadgets.svg"
            alt="LOGO"
          />
        </Link>

        <div className="navbar__links links">
          <ul className="links__items">
            <li className="links__item">
              <NavLink to="/" className={getNavLinkClass}>
                Home
              </NavLink>
            </li>

            <li className="links__item">
              <NavLink to="/phones" className={getNavLinkClass}>
                Phones
              </NavLink>
            </li>

            <li className="links__item">
              <NavLink to="/tablets" className={getNavLinkClass}>
                Tablets
              </NavLink>
            </li>

            <li className="links__item">
              <NavLink to="/accessories" className={getNavLinkClass}>
                Accessories
              </NavLink>
            </li>
          </ul>

          <div className="navbar__buttons">
            <Link to="/favourite" className="navbar-button button__favourite" />
            <Link to="/basket" className="navbar-button button__basket" />
          </div>
        </div>

        <Link className="navbar-button button__burger-menu" to="/menu" />
        {/* <a className="navbar-button button__burger-menu" href="#menu" /> */}
      </nav>

      {/* <aside className="mobile-menu navbar__mobile-menu" id="menu">
        <div className="mobile-menu__topbar">
          <a href="#" className="topbar__logo-link">
            <img
              className="topbar__logo-image"
              src="./img/logo/logo-nice-gadgets.svg"
              alt="LOGO"
            />
          </a>
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
      </aside> */}
    </>
  );
};
