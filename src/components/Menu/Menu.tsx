import React from 'react';
import styles from './Menu.module.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  onClose: () => void;
};

export const Menu: React.FC<Props> = ({ onClose }) => {
  const { pathname } = useLocation();

  return (
    <aside className={styles.menu}>
      <nav className={styles.menu__nav}>
        <Link to={'/'} onClick={onClose} className={styles.menu__nav__logo}>
          <img
            src="./img/logo/Logo.svg"
            alt="Logo"
            className={styles.menu__nav__logo__img}
          />
        </Link>

        <div className={styles.menu__nav__close} onClick={onClose}>
          <img src="./img/icons/icone-close.svg" alt="" />
        </div>
      </nav>

      <ul className={styles.menu__list}>
        <li className={styles.menu__list__item}>
          <NavLink
            to={'/'}
            onClick={onClose}
            className={classNames(styles.menu__list__item__link, {
              [styles.isActive]: pathname === '/',
            })}
          >
            HOME
          </NavLink>
        </li>
        <li className={styles.menu__list__item}>
          <NavLink
            to={'/phones'}
            onClick={onClose}
            className={classNames(styles.menu__list__item__link, {
              [styles.isActive]: pathname.startsWith('/phones'),
            })}
          >
            Phones
          </NavLink>
        </li>
        <li className={styles.menu__list__item}>
          <NavLink
            to={'/tablets'} // ← було /tables (помилка)
            onClick={onClose}
            className={classNames(styles.menu__list__item__link, {
              [styles.isActive]: pathname.startsWith('/tablets'),
            })}
          >
            Tablets
          </NavLink>
        </li>
        <li className={styles.menu__list__item}>
          <NavLink
            to={'/accessories'}
            onClick={onClose}
            className={classNames(styles.menu__list__item__link, {
              [styles.isActive]: pathname.startsWith('/accessories'),
            })}
          >
            Accessories
          </NavLink>
        </li>
      </ul>

      <div className={styles.menu__actions}>
        <Link
          to="/favorites"
          onClick={onClose}
          className={classNames(styles.menu__actions__btn, {
            [styles.isActive]: pathname === '/favourites',
          })}
        >
          <img src="img/icons/heart.svg" alt="Favourites" />
        </Link>

        <Link
          to="/cart"
          onClick={onClose}
          className={classNames(styles.menu__actions__btn, {
            [styles.isActive]: pathname === '/cart',
          })}
        >
          <img src="img/icons/bag.svg" alt="Cart" />
        </Link>
      </div>
    </aside>
  );
};
