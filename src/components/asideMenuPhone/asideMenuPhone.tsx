import styles from './asideMenuPhone.module.scss';
export const AsideMenuPhone = () => {
  return (
    <aside className={styles.menu} id="menu">
      <div className={styles.top__bar}>
        <a href="#">
          <img src="/img/niceLogo.svg" alt="NiceGadgetLogo"></img>
        </a>
        <a href="#" className={`${styles.icon} ${styles['icon--close']}`}>
          <img src="/img/icons/close.svg" alt="menu"></img>
        </a>
      </div>

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

      <div className={styles.menu__bottom}>
        <a
          href="#favorite"
          className={`${styles.icon} ${styles['icon--favorite']}`}
        ></a>
        <div className={styles.divider}></div>
        <a
          href="#cart"
          className={`${styles.icon} ${styles['icon--cart']}`}
        ></a>
      </div>
    </aside>
  );
};
