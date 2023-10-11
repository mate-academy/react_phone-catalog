import React, { useContext } from 'react';
import classNames from 'classnames';
import { useParams, NavLink } from 'react-router-dom';
import { Context } from '../../helpers/context/context';

import './header.scss';

export const Header: React.FC = () => {
  const {
    favList, cartList,
    filterWord,
    setFilterWord,
  } = useContext(Context);
  const titleName = useParams().product;

  return (
    <div className="header" id="header">
      <div className="header__container">

        <div className="header__menu">
          <NavLink title="logo" to="home">
            <span className="header__logo" />
          </NavLink>

          <nav className="nav">
            <ul className="nav__list">
              {useParams().product === undefined ? (
                <li>
                  <NavLink
                    to="/"
                    className="nav__link is-active"
                  >
                    home
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/"
                    className="nav__link"
                  >
                    home
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="phone"
                  className={
                    classNames('nav__link', {
                      'is-active': useParams().product === 'phone',
                    })
                  }
                >
                  phones
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="tablet"
                  className={
                    classNames('nav__link', {
                      'is-active': useParams().product === 'tablet',
                    })
                  }
                >
                  tablets
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="accessories"
                  className={
                    classNames('nav__link', {
                      'is-active': useParams().product === 'accessories',
                    })
                  }
                >
                  accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header__actions">
          {
            ((titleName === 'phone')
            || (titleName === 'tablet')
            || (titleName === 'accessories')) && (
              <form
                className="header__search"
              >
                <label htmlFor="#search">
                  <input
                    type="text"
                    id="search"
                    className="header__search-input"
                    placeholder="Search in favourites..."
                    value={filterWord}
                    onChange={(e) => setFilterWord(e.target.value)}
                  />
                </label>
                {filterWord.length > 0 ? (
                  <button
                    type="button"
                    title="name"
                    onClick={() => setFilterWord('')}
                  >
                    <div className="header__search-close" />
                  </button>
                ) : (
                  <div className="header__search-img" />
                )}
              </form>
            )
          }

          <NavLink
            className="header__button"
            title="favourites"
            to="favourites"
          >
            {favList.length > 0 ? (
              <div className="header__wrap">
                <span className="header__favourites-hurt" />
                <span className="header__number">
                  {favList.length}
                </span>
              </div>
            ) : (
              <span className="header__favourites" />
            )}
          </NavLink>

          <NavLink
            title="cart"
            className="header__button"
            to="cart"
          >
            {cartList.length > 0 ? (
              <div className="header__wrap">
                <span className="header__cart-cart" />
                <span className="header__number">
                  {cartList.length}
                </span>
              </div>
            ) : (
              <span className="header__cart" />
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};
