import { FC } from 'react';

import styles from './Header.module.scss';
import { NavBar } from './index';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <NavBar />
    </header>
  );
};
