import styles from './Footer.module.scss';
export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <img
          className={styles.footer__logo}
          src="./img/logo/Logo.svg"
          alt="Logo"
        />
        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>
            <a
              className={styles.footer__link}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/mate-academy/react_phone-catalog"
            >
              Github
            </a>
          </li>
          <li className={styles.footer__item}>
            <a
              className={styles.footer__link}
              target="_blank"
              rel="noopener noreferrer"
              href="#"
            >
              Contacts
            </a>
          </li>
          <li className={styles.footer__item}>
            <a
              className={styles.footer__link}
              target="_blank"
              rel="noopener noreferrer"
              href="#"
            >
              rights
            </a>
          </li>
        </ul>

        <div className={styles.footer__back}>
          <p className={styles.footer__back__text}>Back to top</p>
          <button
            className={styles.footer__back__button}
            onClick={() => {
              document
                .getElementById('wrapper')
                ?.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          ></button>
        </div>
      </footer>
    </>
  );
};
