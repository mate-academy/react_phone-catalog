import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.scss';

interface Props {
  onBurgerClick: () => void;
  currentLang: string;
  onChangeLang: (lng: string) => void;
}

export const Navbar: React.FC<Props> = ({
  onBurgerClick,
  currentLang,
  onChangeLang,
}) => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const { cartItems } = useCart();

  const favoritesCount = favorites.length;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.navbar__link} ${styles['navbar__link--active']}`
      : styles.navbar__link;

  const getActionButtonClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles['navbar__action-button']} ${styles['navbar__action-button--desktop-only']} ${styles['navbar__action-button--active']}`
      : `${styles['navbar__action-button']} ${styles['navbar__action-button--desktop-only']}`;

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <Link to="/" className={styles.navbar__logo}>
          <img src="/images/icons/Logo.svg" alt="logo" />
        </Link>

        <ul className={styles.navbar__list}>
          <li className={styles.navbar__item}>
            <NavLink to="/" className={getNavLinkClass}>
              {t('nav.home')}
            </NavLink>
          </li>
          <li className={styles.navbar__item}>
            <NavLink to="/phones" className={getNavLinkClass}>
              {t('nav.phones')}
            </NavLink>
          </li>
          <li className={styles.navbar__item}>
            <NavLink to="/tablets" className={getNavLinkClass}>
              {t('nav.tablets')}
            </NavLink>
          </li>
          <li className={styles.navbar__item}>
            <NavLink to="/accessories" className={getNavLinkClass}>
              {t('nav.accessories')}
            </NavLink>
          </li>
        </ul>

        <div className={styles.navbar__actions}>
          <div className={styles['navbar__lang-switcher']}>
            {['en', 'ua', 'pl'].map(lang => (
              <button
                key={lang}
                type="button"
                className={`${styles['lang-btn']} ${currentLang === lang ? styles['lang-btn--active'] : ''}`}
                onClick={() => onChangeLang(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <NavLink to="/favorites" className={getActionButtonClass}>
            <div
              className={`${styles.navbar__icon} ${styles['navbar__icon--favorite']} ${
                favoritesCount > 0 ? styles['is-filled'] : ''
              }`}
            />
            {favoritesCount > 0 && (
              <span className={styles.navbar__badge}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={getActionButtonClass}>
            <div
              className={`${styles.navbar__icon} ${styles['navbar__icon--cart']} ${
                cartCount > 0 ? styles['is-filled'] : ''
              }`}
            />
            {cartCount > 0 && (
              <span className={styles.navbar__badge}>{cartCount}</span>
            )}
          </NavLink>

          <button
            type="button"
            className={`${styles['navbar__action-button']} ${styles.navbar__burger}`}
            onClick={onBurgerClick}
          >
            <div
              className={`${styles.navbar__icon} ${styles['navbar__icon--burger']}`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};
