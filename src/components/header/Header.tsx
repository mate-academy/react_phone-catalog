import { FC } from 'react';

import { NavBar } from './navbar/NavBar';

import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <NavBar />
    </header>
  );
};
