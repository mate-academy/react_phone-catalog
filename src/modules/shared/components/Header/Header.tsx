import { Logo } from '../Logo/Logo';
import { HeaderNav } from './components/HeaderNav/HeaderNav';
import { UserActions } from './components/UserActions/UserActions';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Logo className={styles.headerLogo} />

        <HeaderNav />
      </div>
      <div>
        <UserActions />
      </div>
    </header>
  );
};
