import '../../main.scss';
import styles from './Header.module.scss';

import { TopBar } from '../TopBar';
import { Navigation } from '../Navigation';

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <TopBar icon="menu" />
        <Navigation
          classNamesProps={[styles.header__nav, styles.header__favorites]}
        />
      </header>
    </>
  );
};
