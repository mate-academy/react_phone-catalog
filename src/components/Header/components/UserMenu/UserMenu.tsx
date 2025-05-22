import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import userMenuStyles from './UserMenu.module.scss';
import sharedStyles from '../../../../styles/shared/shared.module.scss';
import { getLinkActive } from '../../../../utils/getLinkActive';
import { ICON_DATA_PATHS } from '../../../../constants/iconDataPaths';
import { IconSvg } from '../../../IconSvg/IconSvg';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoriteContext';
import lodash from 'lodash';
import classNames from 'classnames';

type UserMenuItems = {
  path: string;
  dataPath: string[];
  quantity: number;
};

type Props = {
  onClose?: () => void;
};

export const UserMenu: React.FC<Props> = memo(({ onClose = () => {} }) => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const userMenuItems: UserMenuItems[] = [
    {
      path: ROUTES.FAVORITES,
      dataPath: ICON_DATA_PATHS.FAVORITES.OUTLINE,
      quantity: favorites.length,
    },
    {
      path: ROUTES.CART,
      dataPath: ICON_DATA_PATHS.CART,
      quantity: lodash
        .chain(cart)
        .map(item => item.quantity)
        .sum()
        .value(),
    },
  ];

  return (
    <nav className={userMenuStyles.userMenu} aria-label="User menu">
      <ul className={userMenuStyles.userMenu__list}>
        {userMenuItems.map(({ path, dataPath, quantity }) => (
          <li
            className={classNames(
              userMenuStyles.userMenu__item,
              sharedStyles.headerButton,
            )}
            key={path}
          >
            <NavLink
              to={path}
              className={({ isActive }) =>
                getLinkActive({
                  isActive,
                  baseClass: userMenuStyles.userMenu__button,
                })
              }
              onClick={onClose}
            >
              <span className={userMenuStyles.userMenu__iconWrapper}>
                <IconSvg
                  dataPath={dataPath}
                  className={userMenuStyles.userMenu__icon}
                />
                {quantity > 0 && (
                  <span className={userMenuStyles.userMenu__quantity}>
                    {quantity}
                  </span>
                )}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
});

UserMenu.displayName = 'UserMenu';
