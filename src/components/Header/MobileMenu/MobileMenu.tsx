import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ICON_PATHS } from '../../../shared/constants/IconPaths';
// eslint-disable-next-line max-len
import { PRODUCT_CATEGORIES } from '../../../shared/constants/ProductCategories';

import styles from './MobileMenu.module.scss';
type Props = {
  isOpen: boolean;
  onClose: () => void;
  favoritesCount: number;
  cartCount: number;
};

export const MobileMenu: React.FC<Props> = ({
  isOpen,
  onClose,
  favoritesCount,
  cartCount,
}) => {
  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.classList.add('body--no-scroll');
    } else {
      body.classList.remove('body--no-scroll');
    }

    return () => {
      body.classList.remove('body--no-scroll');
    };
  }, [isOpen]);

  const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.navList__links} ${styles.active}`
      : styles.navList__links;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
      <div className={`${styles.menu} ${isOpen ? styles.slideIn : ''}`}>
        <div className={styles.menuHeader}>
          <Link to="/" className={styles.logo}>
            <img src={ICON_PATHS.logo} alt="Logo" />
          </Link>

          <button className={styles.closeButton} onClick={onClose}>
            <img src={ICON_PATHS.close} alt="Close" />
          </button>
        </div>

        <div className={styles.menuContent}>
          <nav className={styles.navList}>
            <NavLink
              to="/"
              className={getNavLinkClassName}
              onClick={onClose}
              replace
            >
              HOME
            </NavLink>

            {PRODUCT_CATEGORIES.map(category => (
              <NavLink
                key={category}
                to={`/${category}`}
                className={getNavLinkClassName}
                onClick={onClose}
              >
                {category.toUpperCase()}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.menuFooter}>
          <Link
            to="/favorites"
            className={styles.footerButton}
            onClick={onClose}
          >
            <img
              src={ICON_PATHS.heart}
              alt="Favorites"
              className={styles.menuIcon}
            />

            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </Link>

          <Link to="/cart" className={styles.footerButton} onClick={onClose}>
            <img src={ICON_PATHS.cart} alt="Cart" className={styles.menuIcon} />

            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};
