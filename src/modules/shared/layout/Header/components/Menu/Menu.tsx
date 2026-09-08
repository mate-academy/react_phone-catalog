import React from 'react';
import { Navigation } from '../Navigation';
import { TopBar } from '../../../TopBar';
import styles from './Menu.module.scss';

export const Menu = () => {
  return (
    <aside className={styles.menu} id="menu">
      <TopBar />
      <div className={styles.menu__navigation}>
        <Navigation />
      </div>
    </aside>
  );
};
