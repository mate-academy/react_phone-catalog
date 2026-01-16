import styles from './MenuNav.module.scss';

export const MenuNav: React.FC = () => {
  return (
    <nav className={`${styles.nav} ${styles.menu__nav}`}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>
          <a href="#" className={styles.nav__link}>
            Home
          </a>
        </li>
        <li className={styles.nav__item}>
          <a href="#phones" className={styles.nav__link}>
            Phones
          </a>
        </li>
        <li className={styles.nav__item}>
          <a href="#tablets" className={styles.nav__link}>
            tablets
          </a>
        </li>
        <li className={styles.nav__item}>
          <a href="#accessories" className={styles.nav__link}>
            accessories
          </a>
        </li>
      </ul>
    </nav>
  );
};
