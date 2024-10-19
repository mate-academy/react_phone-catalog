import React from 'react';
import styles from './header-tablet.module.scss';
import LogoImage from '../../../assets/images/Logo-header.png';

export const HeaderTablet: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container flex">
        <a href="/" className={styles.header_logo__link}>
          <img src={LogoImage} alt="Logo" className={styles.header_logo} />
        </a>
        <nav className={styles.header_nav}>
          <ul className={styles.header_list}>
            <li className={styles.header_item}>
              <a href="/" className={styles.header_link}>
                HOME
              </a>
            </li>
            <li>
              <a href="/" className={styles.header_link}>
                PHONES
              </a>
            </li>
            <li>
              <a href="/" className={styles.header_link}>
                TABLETS
              </a>
            </li>
            <li>
              <a href="/" className={styles.header_link}>
                ACCESSORIES
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.header_button__div}>
          <div className={styles.header_div1}>
            <a href="/" className={styles.header_button__favorite}></a>
          </div>
          <div className={styles.header_div2}>
            <a href="/" className={styles.header_button__cart}></a>
          </div>
        </div>
      </div>
    </header>
  );
};
