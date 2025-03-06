import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import userMenuStyles from './UserMenu.module.scss';
import { ICON_PATHS } from '../../../constants/iconPaths';
import { getLinkActive } from '../../../modules/utils/getLinkActive';

const userMenuItems = [
  {
    path: ROUTES.FAVORITES,
    iconPath: ICON_PATHS.FAVOURITES,
    alt: 'favourites',
  },
  {
    path: ROUTES.CART,
    iconPath: ICON_PATHS.CART,
    alt: 'cart',
  },
];

export const UserMenu = () => {
  return (
    <ul className={userMenuStyles.userMenu}>
      {userMenuItems.map(({ path, iconPath, alt }) => (
        <li className={`${userMenuStyles.userMenu__item} icon`} key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              getLinkActive({
                isActive,
                baseClass: userMenuStyles.userMenu__icon,
              })
            }
          >
            <img src={iconPath} alt={alt} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
