import { NavLink } from 'react-router-dom';
import './Aside.scss';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'nav__link nav__link--active' : 'nav__link';
};

export const Aside = ({}) => {
  return (
    <aside id="aside" className="aside">
      <nav className="header__nav nav">
        <NavLink className="nav__link" to="./">
          <img
            className="nav__logo logo"
            src="../img/svg/logo.svg"
            alt="logo"
          />
        </NavLink>
        <a
          href="#"
          type="button"
          aria-label="open menu button"
          className="header__burger"
        >
          <i className="burger-ico burger-ico-close" />
        </a>
      </nav>

      <ul className="nav__list-menu">
        <li className="nav__item">
          <NavLink className={getNavLinkClass} to="/">
            HOME
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className={getNavLinkClass} to="/phones">
            PHONES
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className={getNavLinkClass} to="/tablets">
            TABLETS
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className={getNavLinkClass} to="/accessories">
            ACCESSORIES
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
