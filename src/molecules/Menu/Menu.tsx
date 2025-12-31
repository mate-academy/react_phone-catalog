import Link from '@/atoms/Link';
import styles from './Menu.module.scss';

const Menu = () => {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <ul className={styles.menu}>
        <li className={styles.menu__item}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.menu__item}>
          <Link to="/phones">Phones</Link>
        </li>
        <li className={styles.menu__item}>
          <Link to="/tablets">Tablets</Link>
        </li>
        <li className={styles.menu__item}>
          <Link to="/accessories">Accessories</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
