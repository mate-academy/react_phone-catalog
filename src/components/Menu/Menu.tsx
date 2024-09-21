import React from 'react';
import { IconType } from '../../utils/types';
import { Icon } from '../HeaderIcon';
import styles from './Menu.module.scss';
import logo from '../../img/logo.png';

type Props = {
  className?: string;
};

export const Menu: React.FC<Props> = ({ className }) => {
  return (
    <aside className={`${styles.menu} ${className}`} id="menu">
      <div className={styles.menu__top}>
        <div className={styles['menu__top-bar']}>
          <a href="#" className={styles.menu__logo}>
            <img src={logo} alt="page logo" />
          </a>
          <Icon type={IconType.close} href="#" />
        </div>
        <nav className={styles.menu__nav}>
          <ul className={styles.menu__nav_list}>
            <li>
              <a className={styles.menu__nav_link} href="#">
                home
              </a>
            </li>
            <li>
              <a className={styles.menu__nav_link} href="#">
                phones
              </a>
            </li>
            <li>
              <a className={styles.menu__nav_link} href="#">
                tablets
              </a>
            </li>
            <li>
              <a className={styles.menu__nav_link} href="#">
                accessories
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.menu__bottom}>
        <Icon type={IconType.favourites} size="wide" href="#" />
        <Icon type={IconType.cart} size="wide" href="#" />
      </div>
    </aside>
  );
};
