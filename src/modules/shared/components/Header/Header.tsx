import { Logo } from '../Logo/Logo';
import { HeaderNav } from './components/HeaderNav/HeaderNav';
import { UserActions } from './components/UserActions/UserActions';
import { Menu } from './components/Menu';
import { useMenu } from './components/Menu/MenuContext';
import { useMediaQuery } from '@mui/material';
import styles from './Header.module.scss';
import classNames from 'classnames';

export const Header = () => {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const { isMenuOpen } = useMenu();

  return isMobile ? (
    <header className={styles.header}>
      <Logo className={styles.headerLogo} />
      <Menu />

      <div
        className={classNames(styles.menuContainer, {
          [styles.menuOpen]: isMenuOpen,
        })}
      >
        <HeaderNav />
        <UserActions />
      </div>
    </header>
  ) : (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Logo className={styles.headerLogo} />
        <HeaderNav />
      </div>
      <UserActions />
    </header>
  );
};
