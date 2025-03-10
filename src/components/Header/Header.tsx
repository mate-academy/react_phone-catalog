import { Logo } from '../../shared/Logo/Logo';
import { Favorite } from '../../shared/Favorite/Favorite';
import { ShopBag } from '../../shared/ShopBag/ShopBag';
import React from 'react';
import style from './Header.module.scss';
import { NavLink, Link } from 'react-router-dom';
import { Burger } from '../../shared/Burger/Burger';

export const Header: React.FC = () => {
  return (
    <div className={style.header}>
      <div className={style.wrapper}>
        <Link to="/" className={style.headerLogo}>
          <Logo />
        </Link>

        <div className={style.navigation}>
          <ul className={style.navList}>
            <li className={style.navItem}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${style.isActiveLink}` : `${style.navLink}`
                }
              >
                Home
              </NavLink>
            </li>

            <li className={style.navItem}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive ? `${style.isActiveLink}` : `${style.navLink}`
                }
              >
                Phones
              </NavLink>
            </li>

            <li className={style.navItem}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  isActive ? `${style.isActiveLink}` : `${style.navLink}`
                }
              >
                Tablets
              </NavLink>
            </li>

            <li className={style.navItem}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  isActive ? `${style.isActiveLink}` : `${style.navLink}`
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={style.userInetrface}>
          <NavLink to="/favorite" className={style.UIfavorite}>
            <Favorite />
          </NavLink>

          <NavLink to="/bag" className={style.UIshopBag}>
            <ShopBag />
          </NavLink>
        </div>

        <NavLink to="/menu" className={style.burger}>
          <Burger />
        </NavLink>
      </div>
    </div>
  );
};
