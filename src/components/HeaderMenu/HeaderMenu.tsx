import React from 'react';
import styles from './HeaderMenu.module.scss';
import TopBar from '../TopBar/TopBar';

const HeaderMenu = () => {
  return (
    <header className={styles.header}>
      <TopBar />
    </header>
  );
};

export default HeaderMenu;
