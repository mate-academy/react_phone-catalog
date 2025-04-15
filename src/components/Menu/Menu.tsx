import React from 'react';
import style from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
import { Favorite } from '../../shared/Favorite/Favorite';
import { ShopBag } from '../../shared/ShopBag/ShopBag';

export const Menu: React.FC = () => {
  return (
    <div className={style.content}>
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
    </div>
  );
};
