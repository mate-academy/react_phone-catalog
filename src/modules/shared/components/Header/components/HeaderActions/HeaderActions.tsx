/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link, useLocation } from 'react-router-dom';

import { useFavourites } from '@/modules/shared/utils/context/FavouritesContext';
import { useCart } from '@/modules/shared/utils/context/CartContext';

import iconFarourites from '@/assets/svg/heart.svg';
import iconBag from '@/assets/svg/cart.svg';
import iconMenu from '@/assets/svg/menu.svg';

import styles from './HeaderActions.module.scss';
//#endregion

//#region STYLES
const {
  mobileActions,
  actions,
  actionItem,
  actionItemActive,
  actionItemIcon,
  actionItemCount,
  actionItemMenu,
} = styles;
//#endregion

interface Props {
  isMobileMenu?: boolean;
  onMenuClick?: () => void;
}

export const HeaderActions: React.FC<Props> = ({ isMobileMenu, onMenuClick }) => {
  //#region STATE
  const { favouritesCount } = useFavourites();
  const { totalCount } = useCart();
  const { pathname } = useLocation();
  //#endregion

  //#region RENDER
  return (
    <div
      className={`
        ${actions}
        ${isMobileMenu ? mobileActions : ''}
      `}
    >
      <Link
        to="/favourites"
        className={`
          ${actionItem}
          ${pathname === '/favourites' ? actionItemActive : ''}
        `}
      >
        <img src={iconFarourites} className={actionItemIcon} alt="Fav Icon" />
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
        <img src={iconBag} className={actionItemIcon} alt="Bag Icon" />
        {totalCount > 0 && (
          <span className={actionItemCount}>{totalCount}</span>
        )}
      </Link>

      {!isMobileMenu && (
        <a
          className={actionItemMenu}
          onClick={onMenuClick}
        >
          <img src={iconMenu} className={actionItemIcon} alt="Menu Icon" />
        </a>
      )}
    </div>
  );
  //#endregion
};
