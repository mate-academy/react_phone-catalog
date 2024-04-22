import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import './Header.scss';
import Logo from '../../images/homePage/Logo.svg';
import Favorites from '../../images/homePage/Favorites.svg';
import Cart from '../../images/homePage/Cart.svg';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [opened, setOpened] = useState(false);

  const handlePage = () => {
    setOpened(false);
  };

  const handleChange = () => {
    if (opened === false) {
      setOpened(true);
    }

    if (opened === true) {
      setOpened(false);
    }
  };

  return (
    <header
      className={classNames('header', {
        'header--active': opened === true,
      })}
    >
      <div className="header__block">
        <div className="header__top-head">
          <NavLink to="/" onClick={handlePage}>
            <img className="header__logo" src={Logo} alt="logo" />
          </NavLink>
        </div>

        <button className="header__burger" onClick={handleChange}>
          {opened ? (
            <a href="#" className="header__burger__cross" title="menu"></a>
          ) : (
            <a href="#" className="header__burger__link" title="menu"></a>
          )}
        </button>

        <ul
          className={classNames('header__top-heads', {
            'header__top-heads--active': opened === true,
          })}
        >
          <NavLink to="/" className="header__home" onClick={handlePage}>
            HOME
          </NavLink>
          <NavLink to="/phones" className="header__phones" onClick={handlePage}>
            PHONES
          </NavLink>
          <NavLink
            to="/tablets"
            className="header__tablets"
            onClick={handlePage}
          >
            TABLETS
          </NavLink>
          <NavLink
            to="/accessories"
            className="header__accessories"
            onClick={handlePage}
          >
            ACCESSORIES
          </NavLink>
        </ul>
      </div>

      <div
        className={classNames('header__preferies', {
          'header__preferies--active': opened === true,
        })}
      >
        <div className="header__preferies__link">
          <NavLink
            to="/favorites"
            className="header__heart header__heart--favorites"
          >
            <img
              className="header__favorites__img"
              src={Favorites}
              alt="Favorite"
            />
          </NavLink>
        </div>
        <div className="header__preferies__link">
          <NavLink to="/cart" className="header__heart header__heart--cart">
            <img className="header__cart__img" src={Cart} alt="cart" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
