import styles from './Header.module.scss';
import { Logo } from '@/shared/components/Logo';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { BurgerMenu } from './components/BurgerMenu';
import { useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { FavoritesButton } from './components/FavoritesButton';
import { CartButton } from './components/CartButton';

export const Header = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsBurgerMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Logo className={styles.logo} />
        </div>

        <div className={styles.navWrapper}>
          <Nav variant={'row'} />
        </div>

        <div className={styles.buttons}>
          <div className={styles.linksWrapper}>
            <FavoritesButton />
            <CartButton />
          </div>
          <button
            className={styles.burgerMenuButton}
            onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
          >
            <span
              className={classNames(styles.burgerMenuIcon, {
                [styles.isOpen]: isBurgerMenuOpen,
              })}
            ></span>
          </button>
        </div>
      </header>

      <BurgerMenu className={styles.burgerMenu} isOpen={isBurgerMenuOpen} />
    </div>
  );
};
