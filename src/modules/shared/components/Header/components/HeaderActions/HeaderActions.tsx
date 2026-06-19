/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useFavourites } from '@/modules/shared/utils/context/FavouritesContext';
import { useCart } from '@/modules/shared/utils/context/CartContext';

import { LanguageSwitcher } from '../LanguageSwitcher';
import { ThemeToggler } from '../ThemeToggler';

import iconFarourites from '@/assets/svg/heart.svg';
import iconBag from '@/assets/svg/cart.svg';
import iconMenu from '@/assets/svg/menu.svg';

import styles from './HeaderActions.module.scss';
//#endregion

//#region STYLES
const {
  mobileActions: burgerActions,
  actions,
  actionSettings,
  actionItem,
  actionItemActive,
  actionItemIcon,
  actionItemCount,
  actionItemMenu,
} = styles;
//#endregion

interface Props {
  isBurgerMenu?: boolean;
  onMenuClick?: () => void;
}

export const HeaderActions: React.FC<Props> = ({ isBurgerMenu, onMenuClick }) => {
  //#region STATE
  const { favouritesCount } = useFavourites();
  const { totalCount } = useCart();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  //#endregion

  //#region RENDER
  return (
    <div
      className={`
        ${actions}
        ${isBurgerMenu ? burgerActions : ''}
      `}
    >
      {!isBurgerMenu && (
        <div className={actionSettings}>
          <LanguageSwitcher />
          <ThemeToggler />
        </div>
      )}

      <Link
        to="/favourites"
        className={`
          ${actionItem}
          ${pathname === '/favourites' ? actionItemActive : ''}
        `}
      >
        <img
          src={iconFarourites}
          className={actionItemIcon}
          alt={t('header.actions.alt.favourites')}
        />
        {favouritesCount > 0 && (
          <span className={actionItemCount}>{favouritesCount}</span>
        )}
      </Link>

      <Link
        to="/cart"
        className={`
          ${actionItem}
          ${pathname === '/cart' ? actionItemActive : ''}
        `}
      >
        <img
          src={iconBag}
          className={actionItemIcon}
          alt={t('header.actions.alt.bag')}
        />
        {totalCount > 0 && (
          <span className={actionItemCount}>{totalCount}</span>
        )}
      </Link>

      {!isBurgerMenu && (
        <a className={actionItemMenu} onClick={onMenuClick}>
          <img
            src={iconMenu}
            className={actionItemIcon}
            alt={t('header.actions.alt.menu')}
          />
        </a>
      )}
    </div>
  );
  //#endregion
};
