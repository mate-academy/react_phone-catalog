import React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next';
import styles from './BurgerMenu.module.scss';
import heartIcon from '@assets/icons/heart.svg';
import cartIcon from '@assets/icons/cart.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  favoritesCount: number;
  cartCount: number;
  user: User | null;
  isAdmin: boolean;
}

export const BurgerMenu: React.FC<Props> = ({
  isOpen,
  onClose,
  favoritesCount,
  cartCount,
  user,
  isAdmin,
}) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { id: 1, name: t('nav.home'), path: '/' },
    { id: 2, name: t('nav.phones'), path: '/phones' },
    { id: 3, name: t('nav.tablets'), path: '/tablets' },
    { id: 4, name: t('nav.accessories'), path: '/accessories' },
  ];

  const authNavLinks = [
    { id: 5, name: t('nav.orders'), path: 'profile/orders' },
    { id: 6, name: t('nav.chat'), path: 'profile/chat' },
    { id: 7, name: t('nav.favorites'), path: 'profile/favorites' },
  ];

  return (
    <div
      className={`${styles.menu} ${isOpen ? `${styles['menu--open']} is-menu-open` : ''}`}
    >
      <nav className={styles.menu__nav}>
        <ul className={styles.menu__list}>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={styles.menu__item}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ?
                    `${styles.menu__link} ${styles['menu__link--active']}`
                  : styles.menu__link
                }
                onClick={onClose}
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {user && (
            <>
              <li className={styles.menu__divider} />
              {authNavLinks.map((link) => (
                <li
                  key={link.id}
                  className={styles.menu__item}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ?
                        `${styles.menu__link} ${styles['menu__link--active']}`
                      : styles.menu__link
                    }
                    onClick={onClose}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {isAdmin && (
                <li className={styles.menu__item}>
                  <NavLink
                    to="profile/admin"
                    className={({ isActive }) =>
                      isActive ?
                        `${styles.menu__link} ${styles['menu__link--active']}`
                      : styles.menu__link
                    }
                    onClick={onClose}
                  >
                    {t('nav.admin')}
                  </NavLink>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>

      <div className={styles.menu__lang}>
        <button
          className={`${styles.lang_btn} ${i18n.language === 'en' ? styles['lang_btn--active'] : ''}`}
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
        <span className={styles.lang_divider}>|</span>
        <button
          className={`${styles.lang_btn} ${i18n.language === 'ua' ? styles['lang_btn--active'] : ''}`}
          onClick={() => changeLanguage('ua')}
        >
          UA
        </button>
      </div>

      <div className={styles.menu__footer}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ?
              `${styles.footer_btn} ${styles['footer_btn--active']}`
            : styles.footer_btn
          }
          onClick={onClose}
        >
          <div className={styles.icon_container}>
            <img
              src={heartIcon}
              alt="Favorites"
            />
            {favoritesCount > 0 && (
              <span className={styles.badge}>
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </span>
            )}
          </div>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ?
              `${styles.footer_btn} ${styles['footer_btn--active']}`
            : styles.footer_btn
          }
          onClick={onClose}
        >
          <div className={styles.icon_container}>
            <img
              src={cartIcon}
              alt="Cart"
            />
            {cartCount > 0 && (
              <span className={styles.badge}>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
