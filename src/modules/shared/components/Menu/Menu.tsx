import React from 'react';
import '@/styles/main.scss';
import styles from './Menu.module.scss';
import classNames from 'classnames';

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
            <a
              href="#"
              className={classNames(
                styles['menu__nav--link'],
                'text__uppercase',
              )}
              onClick={onClose}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className={classNames(
                styles['menu__nav--link'],
                'text__uppercase',
              )}
              onClick={onClose}
            >
              Phones
            </a>
          </li>
          <li>
            <a
              href="#"
              className={classNames(
                styles['menu__nav--link'],
                'text__uppercase',
              )}
              onClick={onClose}
            >
              Tablets
            </a>
          </li>
          <li>
            <a
              href="#"
              className={classNames(
                styles['menu__nav--link'],
                'text__uppercase',
              )}
              onClick={onClose}
            >
              Accessories
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__icons}>
        <div className={styles['menu__icons--icon']}>
          <a href="#" className="icon icon--heart"></a>
        </div>
        <div className={styles['menu__icons--icon']}>
          <a href="#" className="icon icon--cart"></a>
        </div>
      </div>
    </aside>
  );
};
