import React from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { CartItem } from 'types/CartItem';

type Props = {
  setIsAsideOpen: (a: boolean) => void;
  liked: number[];
  cart: CartItem[];
};

export const Header: React.FC<Props> = ({ setIsAsideOpen, cart, liked }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoMobile}>
        <img src="img/logo/Logo_phone_tablet.svg" alt="logo mobile" />
      </div>
      <div className={styles.logoDesktop}>
        <img src="img/logo/Logo_desktop.svg" alt="logo desktop" />
      </div>

      <button
        onClick={() => {
          setIsAsideOpen(true);
        }}
        className={styles.menuButton}
      >
        <img src="img/buttons/PhoneCatalogButton.svg" alt="button" />
      </button>

      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <NavLink
            to="/"
            end
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
            <div style={{ position: 'relative' }}>
              <img
                className={styles.iconItemImg}
                src="img/buttons/PhoneCatalogHeart.svg"
                alt="button"
              />
              <img
                className={styles.iconItemImgActive}
                src="img/buttons/PhoneCatalogHeartActive.svg"
                alt="button"
              />
              <div
                className={
                  liked.length === 0 ? styles.number_none : styles.number_item
                }
              >
                {liked?.length || 0}
              </div>
            </div>
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
            <div style={{ position: 'relative' }}>
              <img src="img/buttons/PhoneCatalogCart.svg" alt="button" />
              <div
                className={
                  cart.length === 0 ? styles.number_none : styles.number_item
                }
              >
                {cart?.length || 0}
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
