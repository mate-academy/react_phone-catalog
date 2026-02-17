import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__content"]}>
        <a href="#" className={styles["footer__logo-link"]}>
          <img src="./img/Logo.png" alt="logo" className={styles["footer__logo"]} />
        </a>
        <ul className={styles["footer__menu"]}>
          <li className={styles["footer__item"]}>
         <a
           href="#"
           className={styles["footer__link"]}
          >
          GITHUB
         </a>
          </li>
          <li className={styles["footer__item"]}>
         <a
           href="#"
           className={styles["footer__link"]}
          >
          CONTACTS
         </a>
          </li>
          <li className={styles["footer__item"]}>
         <a
           href="#"
           className={styles["footer__link"]}
          >
          RIGHTS
         </a>
          </li>
        </ul>
      </div>
      <div className={styles["footer__button"]}>
      <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})} className={styles["footer__button-content"]}>
        <span className={styles["footer__button-text"]}>Back to top</span>
        <img src="./img/Chevron-Arrow-Right.png" alt="icon" className={styles["footer__button-icon"]} />
      </a>
      </div>
    </footer>
  )
}
