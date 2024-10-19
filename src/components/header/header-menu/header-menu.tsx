import React from 'react';
import styles from './header-menu.module.scss';

export const HeaderMenu: React.FC = () => {
  return (
    <>
      <nav className={styles.header}>
        <ul className={styles.header_list}>
          <li className={styles.header_item}>
            <a href="/" className={styles.header_link}>
              HOME
            </a>
          </li>
          <li className={styles.header_item}>
            <a href="/" className={styles.header_link}>
              PHONES
            </a>
          </li>
          <li className={styles.header_item}>
            <a href="/" className={styles.header_link}>
              TABLETS
            </a>
          </li>
          <li className={styles.header_item}>
            <a href="/" className={styles.header_link}>
              ACCESSORIES
            </a>
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
    </>
  );
};
