import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import Logo from '../../img/logo.svg';
// import Search from '../../img/Search.svg';
import Favorite from '../../img/favourites.svg';
import Basket from '../../img/group.svg';
import { useAppContext } from '../../components/Context';

export const Header = () => {
  const { prevCartPhonesArr } = useAppContext();
  const { prevFavoriteArr } = useAppContext();

  useEffect(() => {

  }, [prevCartPhonesArr]);

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
      <NavLink
        to="favorite"
        className="header__link favorites"
      >
        {prevFavoriteArr && prevFavoriteArr.length > 0 && (
          <div className="header__link__pop-up">{prevFavoriteArr.length}</div>
        )}
        <img
          src={Favorite}
          className="header__link-icon"
          alt="Favorite"
        />
      </NavLink>
      <NavLink
        to="cart"
        // className="header__link__nav-link"
        className="header__link basket"
      >
        {prevCartPhonesArr && prevCartPhonesArr.length > 0 && (
          <div className="header__link__pop-up">{prevCartPhonesArr.length}</div>
        )}
        <img
          src={Basket}
          className="header__link-icon"
          alt=""
        />
      </NavLink>
    </header>
  );
};
