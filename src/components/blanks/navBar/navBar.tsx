import styles from './NavBar.module.scss';

export const NavBar = () => {
  return (
    <div className={styles.top__bar}>
      <a href="#">
        <img src="/img/niceLogo.svg" alt="NiceGadgetLogo"></img>
      </a>

       <nav className={styles.nav}>
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
              Tablets
            </a>
          </li>
          <li className={styles.nav__item}>
            <a href="#acessories" className={styles.nav__link}>
              Acessories
            </a>
          </li>
        </ul>
      </nav>

      <a href="#menu" className={`${styles.icon} ${styles['icon--top']}`}>
        <img src="/img/Menu.svg" alt="menu"></img>
      </a>
    </div>
  );
};
