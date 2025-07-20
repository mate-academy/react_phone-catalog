import type { FC } from 'react';

import { Outlet } from 'react-router-dom';

import styles from './Main.module.scss';
import { ThemeSwitcher } from '../UI/ThemeSwitcher';
import { UserMenuButton } from '../UserMenuButton';

export const Main: FC = () => {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.buttonsBox}>
          <div className={styles.themeSwitcherBox}>
            <ThemeSwitcher />
          </div>
          <div className={styles.UserMenuButtonBox}>
            <UserMenuButton />
          </div>
        </div>

        <Outlet />
      </div>
    </main>
  );
};
