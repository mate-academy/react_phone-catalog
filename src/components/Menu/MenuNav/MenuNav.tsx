import styles from './MenuNav.module.scss';
import { Link } from 'react-router-dom';

type MenuNavProps = {
  className?: string;
  handleMenuClick?: () => void;
};

export const MenuNav: React.FC<MenuNavProps> = ({
  className,
  handleMenuClick,
}) => {
  return (
    <div className={`${styles.menu}`}>
      <nav
        className={`${styles.nav} ${styles.menu__nav} ${className ? className : ''}`}
      >
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <Link to="/" className={styles.nav__link} onClick={handleMenuClick}>
              Home
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link
              to="/phones"
              className={styles.nav__link}
              onClick={handleMenuClick}
            >
              Phones
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link
              to="/tablets"
              className={styles.nav__link}
              onClick={handleMenuClick}
            >
              tablets
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link
              to="/accessories"
              className={styles.nav__link}
              onClick={handleMenuClick}
            >
              accessories
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
