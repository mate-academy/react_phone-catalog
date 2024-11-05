import React, { useEffect, useState } from 'react';
import styles from './header-menu.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import classNames from 'classnames';

interface HeaderMenuProps {
  onClose: () => void;
  isHeaderModalOpen: boolean;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({
  onClose,
  isHeaderModalOpen,
}) => {
  const favoriteItem = useSelector((state: RootState) => state.favorite.items);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isVisible, setIsVisible] = useState(isHeaderModalOpen);

  useEffect(() => {
    if (isHeaderModalOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isHeaderModalOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={classNames(styles.header_container, {
        [styles.menu_enter]: isHeaderModalOpen,
        [styles.menu_exit]: !isHeaderModalOpen,
      })}
    >
      <nav className={styles.header}>
        <ul className={styles.header_list}>
          <li className={styles.header_item} onClick={onClose}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames(styles.header_link, {
                  [styles.is_active]: isActive,
                })
              }
            >
              HOME
            </NavLink>
          </li>
          <li className={styles.header_item} onClick={onClose}>
            <NavLink
              to="phones"
              className={({ isActive }) =>
                classNames(styles.header_link, {
                  [styles.is_active]: isActive,
                })
              }
            >
              PHONES
            </NavLink>
          </li>
          <li className={styles.header_item} onClick={onClose}>
            <NavLink
              to="tablets"
              className={({ isActive }) =>
                classNames(styles.header_link, {
                  [styles.is_active]: isActive,
                })
              }
            >
              TABLETS
            </NavLink>
          </li>
          <li className={styles.header_item} onClick={onClose}>
            <NavLink
              to="accessories"
              className={({ isActive }) =>
                classNames(styles.header_link, {
                  [styles.is_active]: isActive,
                })
              }
            >
              ACCESSORIES
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.flex}>
        <div className={styles.header_div1}>
          <Link
            to="favorites"
            className={styles.header_favorite}
            onClick={onClose}
          >
            {favoriteItem.length > 0 ? (
              <span className={styles.quan}>{favoriteItem.length}</span>
            ) : null}
          </Link>
        </div>
        <div className={styles.header_div2}>
          <Link to="cart" className={styles.header_cart} onClick={onClose}>
            {cartItems.length > 0 ? (
              <span className={styles.quan}>{cartItems.length}</span>
            ) : null}
          </Link>
        </div>
      </div>
    </div>
  );
};
