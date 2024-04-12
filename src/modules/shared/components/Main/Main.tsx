import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Main.module.scss';

export const Main: React.FC = () => (
  <main>
    <div className={styles.container}>
      <Outlet />
    </div>
  </main>
);
