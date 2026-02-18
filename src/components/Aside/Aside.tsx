import React from 'react';
import styles from './Aside.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  onClose: () => void;
};

export const Aside: React.FC<Props> = ({ onClose }) => {
  return (
    <aside>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="img/logo/Logo_phone_tablet.svg" alt="logo mobile" />
        </div>

        <button onClick={onClose} className={styles.menuButton}>
          <img src="img/buttons/PhoneCatalogClose.svg" alt="close" />
        </button>
      </header>
      <main className={styles.main}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.mainItem} ${styles.mainItemActive}`
              : styles.mainItem
          }
          to="/"
          onClick={onClose}
        >
          home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.mainItem} ${styles.mainItemActive}`
              : styles.mainItem
          }
          to="/phones"
          onClick={onClose}
        >
          Phones
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.mainItem} ${styles.mainItemActive}`
              : styles.mainItem
          }
          to="/tablets"
          onClick={onClose}
        >
          tablets
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.mainItem} ${styles.mainItemActive}`
              : styles.mainItem
          }
          to="/accessories"
          onClick={onClose}
        >
          accessories
        </NavLink>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerItem}>
          <NavLink
            to="/liked"
            className={styles.footerItemImg}
            onClick={onClose}
          >
            <img src="img/buttons/PhoneCatalogHeart.svg" alt="heart" />
          </NavLink>
        </div>
        <div className={styles.footerItem}>
          <NavLink
            to="/cart"
            className={styles.footerItemImg}
            onClick={onClose}
          >
            <img src="img/buttons/PhoneCatalogCart.svg" alt="cart" />
          </NavLink>
        </div>
      </footer>
    </aside>
  );
};
