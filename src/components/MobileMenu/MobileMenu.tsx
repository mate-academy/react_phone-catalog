import React, { useEffect, useState } from 'react';
import styles from './MobileMenu.module.scss';
import { NavLink } from 'react-router-dom';

import logo from '../../../public/img/logo.png';
import closeIcon from '../../../public/img/assets/icons/close.png';
import favouritesIcon from '../../../public/img/assets/icons/favourites.png';
import cartIcon from '../../../public/img/assets/icons/shopping-cart.png';
import classNames from 'classnames';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div
        className={classNames(styles.menu, {
          [styles['menu-open']]: isOpen,
          [styles['menu--closing']]: isClosing,
        })}
      >
        <div className={styles.menu__top}>
          <NavLink to={'/'}>
            <img src={logo} className={styles.menu__logo} alt="Logo" />
          </NavLink>

          <button onClick={handleClose} className={styles.menu__close}>
            <img
              src={closeIcon}
              alt="Icon close"
              className={styles.menu__icon}
            />
          </button>
        </div>

        <nav className={styles.menu__nav}>
          <NavLink
            to={'/home'}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
          <NavLink
            to={'/phones'}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Phones
          </NavLink>
          <NavLink
            to={'/tablets'}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Tablets
          </NavLink>
          <NavLink
            to={'/accessories'}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Accessories
          </NavLink>
        </nav>

        <div className={styles.menu__footer}>
          <NavLink to={'/favourites'} onClick={handleClose}>
            <img
              src={favouritesIcon}
              alt="Favourites Icon"
              className={styles.menu__icon}
            />
          </NavLink>
          <NavLink to={'/cart'} onClick={handleClose}>
            <img
              src={cartIcon}
              alt="Shopping Cart Icon"
              className={styles.menu__icon}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
