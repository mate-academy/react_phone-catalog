import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';
import React from 'react';

type Props = {
  setMenuIsOpen: (v: boolean) => void;
};

export const Navigation: React.FC<Props> = ({ setMenuIsOpen }) => {
  return (
    <nav className={s.navigation}>
      <ul className={s.navigation__list}>
        <li className={s.navigation__item} onClick={() => setMenuIsOpen(false)}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${s.navigation__link} ${s['navigation__link--active']}`
                : `${s.navigation__link}`
            }
            to="/"
          >
            Home
          </NavLink>
        </li>

        <li className={s.navigation__item} onClick={() => setMenuIsOpen(false)}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${s.navigation__link} ${s['navigation__link--active']}`
                : `${s.navigation__link}`
            }
            to="/phones"
          >
            Phones
          </NavLink>
        </li>

        <li className={s.navigation__item} onClick={() => setMenuIsOpen(false)}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${s.navigation__link} ${s['navigation__link--active']}`
                : `${s.navigation__link}`
            }
            to="/tablets"
          >
            Tablets
          </NavLink>
        </li>

        <li className={s.navigation__item} onClick={() => setMenuIsOpen(false)}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${s.navigation__link} ${s['navigation__link--active']}`
                : `${s.navigation__link}`
            }
            to="/accessories"
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
