import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import React from 'react';
import { useTheme } from '../../../../store/theme/ThemeContext';
import { favouriteIconMap } from '../../config/favouriteIconMap';
import { shoppingBagMap } from '../../config/shoppingBagMap';
import { useScrollToTop } from '../../../../hooks/useScrollToTop';
import { ThemeSwitcher } from '../ThemeSwitcher';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const scrollToTop = useScrollToTop();

  return (
    <aside
      className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}
    >
      <nav className={styles.mobileNav}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link
              to="/"
              className={styles.menuLink}
              onClick={() => {
                onClose();
                scrollToTop();
              }}
            >
              Home
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link
              to="/phones"
              className={styles.menuLink}
              onClick={() => {
                onClose();
                scrollToTop();
              }}
            >
              Phones
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link
              to="/tablets"
              className={styles.menuLink}
              onClick={() => {
                onClose();
                scrollToTop();
              }}
            >
              Tablets
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link
              to="/accessories"
              className={styles.menuLink}
              onClick={() => {
                onClose();
                scrollToTop();
              }}
            >
              Accessories
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.themeRow}>
        <span className={styles.themeLabel}>Theme</span>
        <ThemeSwitcher />
      </div>

      <div className={styles.menuIcons}>
        <Link
          to="/favourites"
          className={styles.menuIcon}
          onClick={() => {
            onClose();
            scrollToTop();
          }}
        >
          <img src={favouriteIconMap[theme].default} alt="Favourites" />
        </Link>

        <Link
          to="/cart"
          className={styles.menuIcon}
          onClick={() => {
            onClose();
            scrollToTop();
          }}
        >
          <img src={shoppingBagMap[theme]} alt="Shopping bag" />
        </Link>
      </div>
    </aside>
  );
};
