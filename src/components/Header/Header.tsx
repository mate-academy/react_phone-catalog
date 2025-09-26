import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => (
  <header className="header">
    <div className="header__nav">
      <div className="header__logo">
        <NavLink to="/">
          <img src="../img/main-logo.png" alt="mainLogo" className="header__logo__img" />
        </NavLink>
      </div>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'nav__item__link nav__item__link--active' : 'nav__item__link'
              }
            >
              home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive ? 'nav__item__link nav__item__link--active' : 'nav__item__link'
              }
            >
              phones
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive ? 'nav__item__link nav__item__link--active' : 'nav__item__link'
              }
            >
              tablets
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive ? 'nav__item__link nav__item__link--active' : 'nav__item__link'
              }
            >
              accessories
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>

    <div className="header__bttns">
      <ul className="header__bttns__list">
        <li className="header__bttns__item header__bttns__item--phone">
          <NavLink to="/menu">
            <img src="./img/menu.png" alt="menuLogo" className="header__bttns__logo" />
          </NavLink>
        </li>
        <li className="header__bttns__item header__bttns__item--tablet">
          <NavLink to="/favourites">
            <img src="./img/favourites.png" alt="favouritesLogo" className="header__bttns__logo" />
          </NavLink>
        </li>
        <li className="header__bttns__item header__bttns__item--tablet">
          <NavLink to="/cart">
            <img src="./img/cart.png" alt="favocart" className="header__bttns__logo" />
          </NavLink>
        </li>
      </ul>
    </div>
  </header>
);
