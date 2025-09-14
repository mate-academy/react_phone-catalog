import React from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  setIsAsideOpen: (a: boolean) => void;
};

export const Header: React.FC<Props> = ({ setIsAsideOpen }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoMobile}>
        <img src="/img/logo/Logo_phone_tablet.svg" alt="logo mobile" />
      </div>
      <div className={styles.logoDesktop}>
        <img src="/img/logo/Logo_desktop.svg" alt="logo desktop" />
      </div>

      <button
        onClick={() => {
          setIsAsideOpen(true);
        }}
        className={styles.menuButton}
      >
        <img src="/img/buttons/PhoneCatalogButton.svg" alt="button" />
      </button>

      {/* <NavLink
        to="/aside"
        className={({ isActive }) =>
          isActive ? `${styles.menuButton} ${styles.active}` : styles.menuButton
        }
      >
        <img src="/img/buttons/PhoneCatalogButton.svg" alt="button" />
      </NavLink> */}

      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.menuListItem} ${styles.menuListItemActive}`
                : styles.menuListItem
            }
          >
            home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive
                ? `${styles.menuListItem} ${styles.menuListItemActive}`
                : styles.menuListItem
            }
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              isActive
                ? `${styles.menuListItem} ${styles.menuListItemActive}`
                : styles.menuListItem
            }
          >
            tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive
                ? `${styles.menuListItem} ${styles.menuListItemActive}`
                : styles.menuListItem
            }
          >
            accessories
          </NavLink>
        </ul>
      </div>

      <div className={styles.icon}>
        <div>
          <NavLink
            to="/liked"
            className={({ isActive }) =>
              isActive
                ? `${styles.iconItem} ${styles.iconItemActive}`
                : styles.iconItem
            }
          >
            <img
              className={styles.iconItemImg}
              src="/img/buttons/PhoneCatalogHeart.svg"
              alt="button"
            />
            <img
              className={styles.iconItemImgActive}
              src="/img/buttons/PhoneCatalogHeartActive.svg"
              alt="button"
            />
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.iconItem} ${styles.iconItemActive}`
                : styles.iconItem
            }
          >
            <img src="/img/buttons/PhoneCatalogCart.svg" alt="button" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
