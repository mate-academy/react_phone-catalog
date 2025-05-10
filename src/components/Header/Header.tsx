import { Navigation } from '../Navigation';
import { Topbar } from '../Topbar';
import styles from './Header.module.scss';
export const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Header</h1>
      <Topbar />
      <Navigation />
    </header>
  );
};
