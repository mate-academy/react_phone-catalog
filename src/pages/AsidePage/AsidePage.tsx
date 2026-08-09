import React from 'react';
import style from './AsidePage.module.scss';
import { NavLink } from 'react-router-dom';

export const AsidePage: React.FC = () => {
  return (
    <div className={style.menu}>
      <ul className={style.menuItems}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? `${style.menuItem} ${style.menuItemActive}`
              : style.menuItem
          }
        >
          home
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            isActive
              ? `${style.menuItem} ${style.menuItemActive}`
              : style.menuItem
          }
        >
          phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            isActive
              ? `${style.menuItem} ${style.menuItemActive}`
              : style.menuItem
          }
        >
          tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            isActive
              ? `${style.menuItem} ${style.menuItemActive}`
              : style.menuItem
          }
        >
          accessories
        </NavLink>
      </ul>
    </div>
  );
};
