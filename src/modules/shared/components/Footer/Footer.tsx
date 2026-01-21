import styles from './Footer.module.scss';
import logo from './../../../../../public/img/logo.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__content}>
          <div className={styles.footer__logo}>
            <img src={logo} alt="logo" />
          </div>
          <nav className={styles.footer__nav}>
            <ul className={styles.footer__items}>
              <li className={styles.footer__item}>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://github.com/iirk1"
                >
                  Github
                </a>
              </li>
              <li className={styles.footer__item}>
                <a href="#">Contacts</a>
              </li>
              <li className={styles.footer__item}>
                <a href="#">rights</a>
              </li>
            </ul>
          </nav>
          <div className={styles.footer__btn}>
            <p className={styles.btn__text}>Back to top</p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={styles.btn__icon}
            >
              ˄
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
