import React from 'react';
import styles from './header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_div}>
          <a href="/">
            <img
              src="../../public/img/littleImages/Logo-header.png"
              alt="logo"
              className={styles.header_logo}
            />
          </a>
          <div className={styles.header_menu}>
            <a href="/" className={styles.header_icon}></a>
          </div>
        </div>
      </div>
    </header>
  );
};
