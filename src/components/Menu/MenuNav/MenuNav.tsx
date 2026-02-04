import { Link } from 'react-router-dom';
import styles from './MenuNav.module.scss';

type MenuNavProps = {
  className?: string;
};

export const MenuNav: React.FC<MenuNavProps> = ({ className }) => {
  return (
    <div className={`${styles.menu}`}>
      <nav
        className={`${styles.nav} ${styles.menu__nav} ${className ? className : ''}`}
      >
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <Link to="/" className={styles.nav__link}>
              Home
            </L>
          </li>
          <li className={styles.nav__item}>
            <Link to="#phones" className={styles.nav__link}>
              Phones
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="#tablets" className={styles.nav__link}>
              tablets
            </>
          </li>
          <li className={styles.nav__item}>
            <Link to="#accessories" className={styles.nav__link}>
              accessories
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
