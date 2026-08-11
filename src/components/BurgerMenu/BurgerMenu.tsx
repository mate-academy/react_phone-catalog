import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import { translations } from '../../locales'; // Ваша локалізація

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  favoritesCount: number;
  cartCount: number;
  theme: string;
  toggleTheme: () => void;
  language: 'eng' | 'ukr';
  changeLanguage: (lang: 'eng' | 'ukr') => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  isOpen,
  onClose,
  favoritesCount,
  cartCount,
  theme,
  toggleTheme,
  language,
  changeLanguage,
}) => {
  // Заморожуємо скрол фону сайту при відкритому бургері
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('is-locked');
    } else {
      document.body.classList.remove('is-locked');
    }

    return () => {
      document.body.classList.remove('is-locked');
    };
  }, [isOpen]);

  // Динамічні класи для активних посилань (Home, Phones...)
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `${styles['burger__nav-link']} ${isActive ? styles['burger__nav-link--active'] : ''}`;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.burger} data-theme={theme}>
      {/* 1. ХЕДЕР БУРГЕРА: Логотип (змінюється від теми) та Кнопка-хрестик */}
      <div className={styles.burger__header}>
        <Link to="/" className={styles.burger__logo} onClick={onClose}>
          <img
            src={theme === 'dark' ? 'logo.dark.svg' : 'logo.svg'}
            alt="Nice Gadgets Logo"
            className={styles['burger__logo-img']}
          />
        </Link>

        <button
          type="button"
          className={styles['burger__close-btn']}
          onClick={onClose}
          aria-label="Close menu"
        >
          <img
            src="public/img/icons/icon-isopen.svg"
            className={styles['burger__close-icon']}
          />
        </button>
      </div>

      {/* 2. НАВІГАЦІЯ: */}
      <nav className={styles.burger__nav}>
        <ul className={styles['burger__nav-list']}>
          <li className={styles['burger__nav-item']}>
            <NavLink to="/" className={getLinkClass} onClick={onClose}>
              {translations.header.home[language]}
            </NavLink>
          </li>
          <li className={styles['burger__nav-item']}>
            <NavLink to="/phones" className={getLinkClass} onClick={onClose}>
              {translations.header.phones[language]}
            </NavLink>
          </li>
          <li className={styles['burger__nav-item']}>
            <NavLink to="/tablets" className={getLinkClass} onClick={onClose}>
              {translations.header.tablets[language]}
            </NavLink>
          </li>
          <li className={styles['burger__nav-item']}>
            <NavLink
              to="/accessories"
              className={getLinkClass}
              onClick={onClose}
            >
              {translations.header.accessories[language]}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* 4. ФУТЕР БУРГЕРА: Серце та Кошик з вашими картинками */}
      <div className={styles.burger__footer}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles['burger__icon-btn']} ${isActive ? styles['burger__icon-btn--active'] : ''}`
          }
          onClick={onClose}
        >
          <div className={styles['burger__icon-container']}>
            <img
              src="favorites.svg"
              alt="Favorites"
              className={styles.burger__icon}
            />
            {favoritesCount > 0 && (
              <span className={styles.burger__counter}>{favoritesCount}</span>
            )}
          </div>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles['burger__icon-btn']} ${isActive ? styles['burger__icon-btn--active'] : ''}`
          }
          onClick={onClose}
        >
          <div className={styles['burger__icon-container']}>
            <img src="cart.svg" alt="Cart" className={styles.burger__icon} />
            {cartCount > 0 && (
              <span className={styles.burger__counter}>{cartCount}</span>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
