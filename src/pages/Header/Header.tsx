import { NavLink } from 'react-router-dom';
import Logo from '../../img/logo.svg';
// import Search from '../../img/Search.svg';
import Favorite from '../../img/favourites.svg';
import Basket from '../../img/group.svg';

export const Header = () => {
  return (
    <header className="header">
      <NavLink to="/">
        <img src={Logo} className="header__logo" alt="logo" />
      </NavLink>
      <nav className="nav">
        <ul className="nav__list">
          <NavLink to="/" className="nav__list__link">
            <li className="nav__list__link__text">
              Home
            </li>
          </NavLink>
          <NavLink to="phones" className="nav__list__link">
            <li className="nav__list__link__text">
              Phones
            </li>
          </NavLink>
          <NavLink to="tablets" className="nav__list__link">
            <li className="nav__list__link__text">
              Tablets
            </li>
          </NavLink>
          <NavLink to="accessories" className="nav__list__link">
            <li className="nav__list__link__text">
              Accessories
            </li>
          </NavLink>
        </ul>
      </nav>
      {/* <label className="header__search">
        <input
          type="text"
          placeholder="Search in phones..."
          className="header__search__input"
        />
        <a
          href="#"
          className="header__link"
        >
          <img
            src={Search}
            className="header__link-icon"
            alt="Search"
          />
        </a>
      </label> */}
      <div className="header__link favorites">
        <NavLink
          to="favorite"
          className=""
        >
          <img
            src={Favorite}
            className="header__link-icon"
            alt="Favorite"
          />
        </NavLink>
      </div>
      <div className="header__link basket">
        <NavLink
          to="cart"
          className=""
        >
          <img
            src={Basket}
            className="header__link-icon"
            alt=""
          />
        </NavLink>
      </div>
    </header>
  );
};
