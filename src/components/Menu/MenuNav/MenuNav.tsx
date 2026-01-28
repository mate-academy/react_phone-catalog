import { Link } from 'react-router-dom';
import styles from './MenuNav.module.scss';

export const MenuNav: React.FC = () => {
  return (
    <div className={styles.menu}>
      <nav className={`${styles.nav} ${styles.menu__nav}`}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <Link to="/" className={styles.nav__link}>
              Home
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/phones" className={styles.nav__link}>
              Phones
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/tablets" className={styles.nav__link}>
              tablets
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/accessories" className={styles.nav__link}>
              accessories
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
