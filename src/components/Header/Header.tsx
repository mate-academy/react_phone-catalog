import { Navigation } from '../Navigation';
import { Topbar } from '../Topbar';
import styles from './Header.module.scss';
export const Header = () => {
  return (
    <header className={styles.header}>
      <Topbar icon="menu" />
      <Navigation
        classNamesProps={[styles.header__nav, styles.header__favorites]}
      />
    </header>
  );
};
