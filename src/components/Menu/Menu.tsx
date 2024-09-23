import React from 'react';
import { IconType } from '../../utils/types';
import { HeaderIcon } from '../HeaderIcon';
import styles from './Menu.module.scss';
import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';

type Props = {
  className?: string;
};

export const Menu: React.FC<Props> = ({ className }) => {
  const closeMenu = (value: string) => {
    window.location.hash = value;
  };

  return (
    <aside className={`${styles.menu} ${className}`} id="menu">
      <div className={styles.menu__top}>
        <div className={styles['menu__top-bar']}>
          <a href="#" className={styles.menu__logo}>
            <img src={logo} alt="page logo" />
          </a>
          <HeaderIcon
            type={IconType.close}
            href="#"
            onClick={() => closeMenu('#')}
          />
        </div>
        <nav className={styles.menu__nav}>
          <ul className={styles.menu__nav_list}>
            <li className={styles.menu__nav_item}>
              <Link
                className={styles.menu__nav_link}
                to="/"
                onClick={() => closeMenu('/')}
              >
                home
              </Link>
            </li>
            <li className={styles.menu__nav_item}>
              <Link
                className={styles.menu__nav_link}
                to="/phones"
                onClick={() => closeMenu('/phones')}
              >
                phones
              </Link>
            </li>
            <li className={styles.menu__nav_item}>
              <Link
                className={styles.menu__nav_link}
                to="/tablets"
                onClick={() => closeMenu('/tablets')}
              >
                tablets
              </Link>
            </li>
            <li className={styles.menu__nav_item}>
              <Link
                className={styles.menu__nav_link}
                to="/accessories"
                onClick={() => closeMenu('/accessories')}
              >
                accessories
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.menu__bottom}>
        <HeaderIcon type={IconType.favourites} size="wide" href="#" />
        <HeaderIcon type={IconType.cart} size="wide" href="#" />
      </div>
    </aside>
  );
};
