import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import userMenuStyles from './UserMenu.module.scss';
import { getLinkActive } from '../../../../utils/getLinkActive';
import { ICON_DATA_PATHS } from '../../../../constants/iconDataPaths';
import { IconSvg } from '../../../IconSvg/IconSvg';

const userMenuItems = [
  {
    path: ROUTES.FAVORITES,
    dataPath: ICON_DATA_PATHS.FAVOURITES,
  },
  {
    path: ROUTES.CART,
    dataPath: ICON_DATA_PATHS.CART,
  },
];

type Props = {
  onClose?: () => void;
};

export const UserMenu: React.FC<Props> = ({ onClose = () => {} }) => {
  return (
    <nav className={userMenuStyles.userMenu} aria-label="User menu">
      <ul className={userMenuStyles.userMenu__list}>
        {userMenuItems.map(({ path, dataPath }) => (
          <li
            className={`${userMenuStyles.userMenu__item} headerButton`}
            key={path}
          >
            <NavLink
              to={path}
              className={({ isActive }) =>
                getLinkActive({
                  isActive,
                  baseClass: userMenuStyles.userMenu__icon,
                })
              }
              onClick={() => onClose()}
            >
              <IconSvg dataPath={dataPath} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
