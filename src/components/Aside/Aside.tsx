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
          to="/react_phone-catalog"
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
          to="/react_phone-catalog/phones"
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
          to="/react_phone-catalog/tablets"
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
          to="/react_phone-catalog/accessories"
          onClick={onClose}
        >
          accessories
        </NavLink>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerItem}>
          <NavLink
            to="/react_phone-catalog/liked"
            className={styles.footerItemImg}
            onClick={onClose}
          >
            <img src="img/buttons/PhoneCatalogHeart.svg" alt="heart" />
          </NavLink>
        </div>
        <div className={styles.footerItem}>
          <NavLink
            to="/react_phone-catalog/cart"
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
