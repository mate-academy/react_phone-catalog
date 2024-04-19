import { Logo } from '../Logo/Logo';
import { HeaderNav } from './components/HeaderNav/HeaderNav';
import { UserActions } from './components/UserActions/UserActions';
import { Menu } from './components/Menu';
import { useMenu } from './components/Menu/MenuContext';
import { useMediaQuery } from '@mui/material';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useEffect } from 'react';
import { closeMenu } from 'modules/shared/helpers/handlers';

export const Header = () => {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const { isMenuOpen, toggleMenu } = useMenu();

  useEffect(() => {
    if (!isMobile) {
      closeMenu(isMenuOpen, toggleMenu);
    }
  }, [isMenuOpen, isMobile, toggleMenu]);

  return isMobile ? (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Logo className={styles.headerLogo} />
        <Menu />
      </div>

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
      <div className={styles.wrapper}>
        <div className={styles.headerLeft}>
          <Logo className={styles.headerLogo} />
          <HeaderNav />
        </div>
        <UserActions />
      </div>
    </header>
  );
};
