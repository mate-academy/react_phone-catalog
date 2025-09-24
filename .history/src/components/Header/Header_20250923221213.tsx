import styles from './Header.module.scss';
import { Logo } from './Logo';
import { NavBar } from './NavBar';
import { Favorites } from './Favorites';
import { Cart } from './Cart';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.headercontent}>
        <div className={styles.nav}>
          <NavBar />
        </div>
      </div>

      <div className={styles.icons}>
        <Favorites />
        <Cart />
      </div>
    </header>
  );
};
