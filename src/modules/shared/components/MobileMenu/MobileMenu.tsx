import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import React from 'react';

type Props = {
  onClose: () => void;
};

export const MobileMenu: React.FC<Props> = ({ onClose }) => {
  return (
    <aside className={styles.mobileMenu}>
      <nav className={styles.mobileNav}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link to="/" className={styles.menuLink} onClick={onClose}>
              Home
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/phones" className={styles.menuLink} onClick={onClose}>
              Phones
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/tablets" className={styles.menuLink} onClick={onClose}>
              Tablets
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link
              to="/accessories"
              className={styles.menuLink}
              onClick={onClose}
            >
              Accessories
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.menuIcons}>
        <Link to="/favourites" className={styles.menuIcon}>
          <img src="/img/icon/favourites-logo.svg" alt="Favourites" />
        </Link>

        <a href="#" className={styles.menuIcon}>
          <img src="/img/icon/shopping-bag-logo.svg" alt="Shopping bag" />
        </a>
      </div>
    </aside>
  );
};
