import { useEffect } from 'react';

import { useMediaQuery } from '@mui/material';
import classNames from 'classnames';

import { useMenuContext } from 'contexts/MenuContext';
import { closeMenu } from 'shared/helpers/handlers';

import { Logo } from '../Logo';

import { HeaderNav } from './components/HeaderNav/HeaderNav';
import { Menu } from './components/Menu';
import { UserActions } from './components/UserActions/UserActions';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const { isMenuOpen, toggleMenu } = useMenuContext();

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
