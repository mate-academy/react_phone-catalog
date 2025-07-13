import React from 'react';
import style from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type GetClassNameParams = {
  isActive: boolean;
  baseClass: string;
  activeClass: string;
};

export const Headers: React.FC = () => {
  const getClassName = ({
    isActive,
    baseClass,
    activeClass,
  }: GetClassNameParams) => {
    return classNames(baseClass, {
      [activeClass]: isActive,
    });
  };

  return (
    <div>
      <div className={style.header}>
        <div className={style.header__container}>
          <h1 className={style.header_hidden}>Product Catalog</h1>
          <a href="/" className={style.header__logoLink}>
            <img src="/img/Logo/Logo.png" className={style.header__logo} />
          </a>
          <nav className={style.header__nav}>
            <ul className={style.header__list}>
              <li className={style.header__item}>
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return getClassName({
                      isActive,
                      baseClass: style.header__link,
                      activeClass: style.header__linkActive,
                    });
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li className={style.header__item}>
                <NavLink
                  to="phones"
                  className={({ isActive }) => {
                    return getClassName({
                      isActive,
                      baseClass: style.header__link,
                      activeClass: style.header__linkActive,
                    });
                  }}
                >
                  Phones
                </NavLink>
              </li>
              <li className={style.header__item}>
                <NavLink
                  to="tablets"
                  className={({ isActive }) => {
                    return getClassName({
                      isActive,
                      baseClass: style.header__link,
                      activeClass: style.header__linkActive,
                    });
                  }}
                >
                  Tablets
                </NavLink>
              </li>
              <li className={style.header__item}>
                <NavLink
                  to="accessories"
                  className={({ isActive }) => {
                    return getClassName({
                      isActive,
                      baseClass: style.header__link,
                      activeClass: style.header__linkActive,
                    });
                  }}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={style.header__wrapper}>
            <NavLink
              to="favorites"
              className={({ isActive }) => {
                return getClassName({
                  isActive,
                  baseClass: style.header__favoritesLink,
                  activeClass: style.header__imageLinkActive,
                });
              }}
            >
              <img
                src="/public/img/Logo/favorites-icon.svg"
                alt="Відкрити улюблені товари"
                className={style.header__favoritesImg}
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
