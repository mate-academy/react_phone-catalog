import React from 'react';
import styles from './header-menu.module.scss';
import { NavLink } from 'react-router-dom';

interface HeaderMenuProps {
  onClose: () => void;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ onClose }) => {
  return (
    <div className={styles.header_container}>
      <nav className={styles.header}>
        <ul className={styles.header_list}>
          <li className={styles.header_item} onClick={onClose}>
            <NavLink to="/" className={styles.header_link}>
              HOME
            </NavLink>
          </li>
          <li className={styles.header_item} onClick={onClose}>
            <NavLink to="phones" className={styles.header_link}>
              PHONES
            </NavLink>
          </li>
          <li className={styles.header_item} onClick={onClose}>
            <NavLink to="tablets" className={styles.header_link}>
              TABLETS
            </NavLink>
          </li>
          <li className={styles.header_item} onClick={onClose}>
            <NavLink to="accessories" className={styles.header_link}>
              ACCESSORIES
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex">
        <div className={styles.header_div1}>
          <a href="/" className={styles.header_favorite}></a>
        </div>
        <div className={styles.header_div2}>
          <a href="/" className={styles.header_cart}></a>
        </div>
      </div>
    </div>
  );
};
