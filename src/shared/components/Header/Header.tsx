import { useState } from 'react';
import { Link } from 'react-router-dom';

import cross from '@/assets/icons/cross.svg';
import menu from '@/assets/icons/menu.svg';
import Logo from '@/assets/images/logo.svg?react';
import { Menu } from '@/shared/components';
import { Button } from '@/shared/components/ui';
import { ROUTES } from '@/shared/constants';
import { cn } from '@/shared/utils';

import styles from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link
        to={ROUTES.HOME}
        className={styles.logo}
        aria-label="Nice Gadgets — Home"
      >
        <Logo className={styles.logo__img} />
      </Link>
      <Menu isVisible={isMenuOpen} />
      <Button
        className={styles.menu}
        onClick={() => setIsMenuOpen(prev => !prev)}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <img
          className={cn(styles.menu__img, { [styles.open]: isMenuOpen })}
          src={isMenuOpen ? cross : menu}
          alt=""
        />
      </Button>
    </header>
  );
};
