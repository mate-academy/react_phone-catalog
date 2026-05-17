import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import styles from './Aside.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Aside: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { favorites } = useFavorites();
  const { cartItems } = useCart();

  const favoritesCount = favorites.length;
  const cartCount = cartItems.length;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <aside className={`${styles.menu} ${isOpen ? styles['menu--open'] : ''}`}>
      <div className={styles.menu__header}>
        <img
          src="images/icons/Logo.svg"
          alt="Nice Gadgets Logo"
          className={styles.menu__logo}
        />
        <button className={styles.menu__close} onClick={onClose}>
          <img src="/images/icons/close.svg" alt="Close menu" />
        </button>
      </div>

      <nav className={styles.menu__nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu__link} ${styles['menu__link--active']}`
              : styles.menu__link
          }
          onClick={onClose}
        >
          {t('nav.home')}
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu__link} ${styles['menu__link--active']}`
              : styles.menu__link
          }
          onClick={onClose}
        >
          {t('nav.phones')}
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu__link} ${styles['menu__link--active']}`
              : styles.menu__link
          }
          onClick={onClose}
        >
          {t('nav.tablets')}
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            isActive
              ? `${styles.menu__link} ${styles['menu__link--active']}`
              : styles.menu__link
          }
          onClick={onClose}
        >
          {t('nav.accessories')}
        </NavLink>
      </nav>

      <div className={styles['menu__lang-switcher']}>
        <button
          className={`${styles['menu__lang-btn']} ${i18n.language === 'en' ? styles['menu__lang-btn--active'] : ''}`}
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
        <button
          className={`${styles['menu__lang-btn']} ${i18n.language === 'ua' ? styles['menu__lang-btn--active'] : ''}`}
          onClick={() => changeLanguage('ua')}
        >
          UA
        </button>
        <button
          className={`${styles['menu__lang-btn']} ${i18n.language === 'pl' ? styles['menu__lang-btn--active'] : ''}`}
          onClick={() => changeLanguage('pl')}
        >
          PL
        </button>
      </div>

      <div className={styles.menu__footer}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? `${styles['menu__footer-btn']} ${styles['menu__footer-btn--active']}`
              : styles['menu__footer-btn']
          }
          onClick={onClose}
        >
          <img src="/images/icons/heart-icon.svg" alt="Favorites" />
          {favoritesCount > 0 && (
            <span className={styles.menu__badge}>{favoritesCount}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? `${styles['menu__footer-btn']} ${styles['menu__footer-btn--active']}`
              : styles['menu__footer-btn']
          }
          onClick={onClose}
        >
          <img src="/images/icons/shoppingbag-icon.svg" alt="Cart" />
          {cartCount > 0 && (
            <span className={styles.menu__badge}>{cartCount}</span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
