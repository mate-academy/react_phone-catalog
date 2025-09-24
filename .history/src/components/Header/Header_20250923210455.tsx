import styles from './Header.module.scss';
import { Logo } from './Logo';
import { NavBar } from './NavBar';
import { Favorites } from './Favorites';
import { Cart } from './Cart';
import { Search } from './Search';
import { ProductsList } from '../ProductPage/ProductsList';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.headercontent}>
        <div className={styles.nav}>
          <NavBar />
          {<ProductsList /> && }
          <Search />
        </div>
      </div>

      <div className={styles.icons}>
        <Favorites />
        <Cart />
      </div>
    </header>
  );
};
