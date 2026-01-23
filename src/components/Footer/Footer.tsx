import styles from './Footer.module.scss';
import Logo from '../Logo/index';

export const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.topBar}>
          <Logo />

                <a href="https://github.com/" className={styles.footer__github}>
                  Github
                </a>
                <a href="/contacts" className={styles.footer__contacts}>
                  Contacts
                </a>
                <a href="/rights" className={styles.footer__rights}>
                  rights
                </a>
              <button className={styles.footer__backToTop} onClick={scrollTop}>
                Back to top
              </button>

        </div>
      </div>
    </footer>
  );
};
