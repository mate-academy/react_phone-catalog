import styles from './footer.module.scss'
export const Footer = () => {
  return (<div className={styles.footer}>
   <a href="#">
        <img src="/img/niceLogo.svg" alt="NiceGadgetLogo"></img>
    </a>

       <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <a href="#" className={styles.nav__link}>
              GitHub
            </a>
          </li>
          <li className={styles.nav__item}>
            <a href="#contacts" className={styles.nav__link}>
              Contacts
            </a>
          </li>
          <li className={styles.nav__item}>
            <a href="#rights" className={styles.nav__link}>
              rights
            </a>
          </li>

        </ul>
        </nav>
    <div className={styles.footer__button}>
      <a href='#' className={styles.footer__text}> Back to Top

      </a>
      <div className={styles.footer__icon}></div>
</div>
</div>)
}
