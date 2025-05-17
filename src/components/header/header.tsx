import styles from './header.module.scss'
export const Header = () => {
  return (<><header className={styles.header}>

    <div className={styles.header__bar}>
      <div className={styles.navigation}>
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
        </div>
<div className={styles.box}>
      <a href="#menu" className={`${styles.icon} ${styles['icon--menu']}`}>

        </a>
        <a href="#favorite" className={`${styles.icon} ${styles['icon--heart']}`}>

        </a>
        <div className={styles.divider}></div>
        <a href="#cart" className={`${styles.icon} ${styles['icon--cart']}`}>

        </a>
        </div>
        </div>




      </header> </>)
}
