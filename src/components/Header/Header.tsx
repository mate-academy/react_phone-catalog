import { NavLink } from 'react-router-dom';
import { NavItem } from '../NavItem';
import './Header.scss';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'nav__link nav__link--active' : 'nav__link';
};

const getActionLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'header__action header__action--active' : 'header__action';
};

export const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav nav">
        <NavLink to="./" className="nav__logo">
          <img
            className="nav__logo logo"
            src="../images/logo.svg"
            alt="logo2"
          />
        </NavLink>
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink to="./" className={getNavLinkClass}>
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="./phones" className={getNavLinkClass}>
              Phones
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/tablets" className={getNavLinkClass}>
              Tablets
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/accessories" className={getNavLinkClass}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* <div className="header__menu menu"> */}
      {/* <div className="menu__search">
          <i className="ico ico-search" />
          <input
            type="text"
            className="menu__search_input"
            placeholder="Search in favourites..."
          />
        </div> */}
      <div className="header__search">
        <span>search</span>
      </div>
      <div className="header__actions">
        <NavLink to="/favorites" className={getActionLinkClass}>
          <NavItem type="fav" />
        </NavLink>
        <NavLink to="/cart" className={getActionLinkClass}>
          <NavItem type="cart" />
        </NavLink>
      </div>
      {/* <a className="menu__button menu__button_fav--active" href="./" />
        <a className="menu__button menu__button_cart" href="./" />
        <a className="menu__button menu__button_cart--active" href="./" /> */}
      {/* </div> */}
    </header>
  );
};
