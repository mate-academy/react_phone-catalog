import React from 'react';
import styles from './MobileMenu.module.scss';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import IconsActions from '../IconActions/IconActions';

type MobileMen = {
  href: string;
  label: string;
};

type Props = {
  items: MobileMen[];
  onClose: () => void;
  isOpen: boolean;
};

const getActiveClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, { [styles['is-active']]: isActive });

export const MobileMenu: React.FC<Props> = ({ items, onClose, isOpen }) => {
  return (
    <>
      <aside
        className={classNames(styles.menu, {
          [styles.is__open]: isOpen,
        })}
      >
        <nav className={styles.menu__nav}>
          <Link to="/" className={styles.menu__nav__logo}>
            <img src="./img/Logo.svg" alt="logo" className={styles.logo} />
          </Link>

          <button className={styles.closeButton} onClick={onClose}>
            <img src="./img/icons/Close.svg" alt="close Button" />
          </button>
        </nav>

        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {items.map(item => {
              return (
                <li className={styles.item} key={item.label}>
                  <NavLink
                    to={item.href}
                    className={getActiveClass}
                    onClick={onClose}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.menu__bottom} onClick={onClose}>
          <IconsActions variant={'mobileMenu'} />
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
