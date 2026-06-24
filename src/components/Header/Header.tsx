import { Navigation } from '../Navigation';
import { Topbar } from '../Topbar';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Topbar icon="menu-burger" />
      <Navigation
        classNamesProps={[styles.header__nav, styles.menu__actions]}
      />
    </header>
  );
};
