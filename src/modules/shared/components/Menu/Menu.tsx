import React from 'react';
import '@/styles/main.scss';
import styles from './Menu.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={classNames(styles.menu, { [styles['menu--open']]: isOpen })}
    >
      <nav className={styles.menu__nav}>
        <ul className={styles['menu__nav--list']}>
          <li>
            <NavLink
              to="/"
              className={classNames(
                'text__uppercase',
                styles['menu__nav--link'],
                {
                  [styles['menu__nav--link__active']]:
                    location.pathname === '/',
                },
              )}
              onClick={onClose}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phones"
              className={classNames(
                'text__uppercase',
                styles['menu__nav--link'],
                {
                  [styles['menu__nav--link__active']]:
                    location.pathname.startsWith('/phones'),
                },
              )}
              onClick={onClose}
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tablets"
              className={classNames(
                'text__uppercase',
                styles['menu__nav--link'],
                {
                  [styles['menu__nav--link__active']]:
                    location.pathname.startsWith('/tablets'),
                },
              )}
              onClick={onClose}
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={classNames(
                'text__uppercase',
                styles['menu__nav--link'],
                {
                  [styles['menu__nav--link__active']]:
                    location.pathname.startsWith('/accessories'),
                },
              )}
              onClick={onClose}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__icons}>
        <div
          className={classNames(styles['menu__icons--icon'], {
            [styles['menu__icons--icon__active']]:
              location.pathname.startsWith('/favorites'),
          })}
        >
          <NavLink to="/favorites" className="icon icon--heart-empty"></NavLink>
        </div>
        <div
          className={classNames(styles['menu__icons--icon'], {
            [styles['menu__icons--icon__active']]:
              location.pathname.startsWith('/cart'),
          })}
        >
          <NavLink to="/cart" className="icon icon--cart"></NavLink>
        </div>
      </div>
    </aside>
  );
};
