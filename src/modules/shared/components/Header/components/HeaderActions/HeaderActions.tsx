/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useFavourites } from '@/modules/shared/utils/context/FavouritesContext';
import { useCart } from '@/modules/shared/utils/context/CartContext';
import { useTheme } from '@/modules/shared/utils/context/ThemeContext';

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
  themeToggler,
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
  const { theme, toggleTheme } = useTheme();

  const { pathname } = useLocation();
  const { t } = useTranslation();
  //#endregion

  //#region LANGUAGE_CHANGE
  const { i18n } = useTranslation();

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  //#endregion

  //#region RENDER
  return (
    <div
      className={`
        ${actions}
        ${isMobileMenu ? mobileActions : ''}
      `}
    >

      {/*//! ТИМЧАСОВИЙ ПЕРЕМИКАЧ МОВИ */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', margin: '0 16px' }}>
          <button
            type="button"
            onClick={() => toggleLanguage('en')}
            style={{
              padding: '4px 8px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: i18n.language.startsWith('en')
                ? '#313237'
                : '#fff',
              color: i18n.language.startsWith('en') ? '#fff' : '#313237',
              fontWeight: i18n.language.startsWith('en') ? 'bold' : 'normal',
            }}
          >
            EN
          </button>

          <button
            type="button"
            onClick={() => toggleLanguage('uk')}
            style={{
              padding: '4px 8px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: i18n.language.startsWith('uk')
                ? '#313237'
                : '#fff',
              color: i18n.language.startsWith('uk') ? '#fff' : '#313237',
              fontWeight: i18n.language.startsWith('uk') ? 'bold' : 'normal',
            }}
          >
            UA
          </button>
        </div>
      </div>
      {/* //! ТИМЧАСОВИЙ ПЕРЕМИКАЧ МОВИ */}

      <button
        className={themeToggler}
        onClick={toggleTheme}
        type="button"
        aria-label={t('header.actions.aria.theme')}
      >
        {theme === 'light' ? '☀️' : '🌙'}
      </button>

      <Link
        to="/favourites"
        className={`
          ${actionItem}
          ${pathname === '/favourites' ? actionItemActive : ''}
        `}
      >
        <img src={iconFarourites} className={actionItemIcon} alt={t('header.actions.alt.favourites')}  />
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
        <img src={iconBag} className={actionItemIcon} alt={t('header.actions.alt.bag')} />
        {totalCount > 0 && (
          <span className={actionItemCount}>{totalCount}</span>
        )}
      </Link>

      {!isMobileMenu && (
        <a className={actionItemMenu} onClick={onMenuClick}>
          <img src={iconMenu} className={actionItemIcon} alt={t('header.actions.alt.menu')} />
        </a>
      )}
    </div>
  );
  //#endregion
};
