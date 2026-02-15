import { Icon } from '../Icon';
import { Logo } from '../Logo';
import { NavIcon } from '../NavIcon/NavIcon';
import { NavigationMenu } from '../NavigationMenu';
import { ThemeToggle } from '../ThemeToggle';
import styles from './Header.module.scss';
import { useMenu } from '../../hooks/useMenu';

export const Header = () => {
  const { isOpen, openMenu, closeMenu } = useMenu();

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Logo />
      </div>

      <div className={styles.header__nav}>
        <NavigationMenu isMenu={false} />
      </div>

      <div className={styles.header__icons}>
        <div className={styles.icon}>
          <ThemeToggle />
        </div>

        <div
          className={`${styles.header__icon} ${styles['header__icon--link']}`}
        >
          <NavIcon path="/favourites" type="favourite" />
        </div>

        <div
          className={`${styles.header__icon} ${styles['header__icon--link']}`}
        >
          <NavIcon path="/cart" type="cart" />
        </div>

        <button
          type="button"
          className={`${styles.header__icon} ${styles['header__icon--btn']}`}
          onClick={() => (isOpen ? closeMenu() : openMenu())}
        >
          <Icon type={isOpen ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
};
