import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ButtonWithIcon } from '../ButtonWithIcon';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__top}>
          <Link to="/" onClick={scrollToTop}>
            <img
              src="/icons/logo.png"
              alt="logo"
              className={styles.footer__image}
            />
          </Link>
        </div>
        <div className={styles.footer__links}>
          <a
            className={styles.footer__link}
            href="https://github.com/uuunemployed"
          >
            Github
          </a>
          <a className={styles.footer__link} href="#">
            Contacts
          </a>
          <a className={styles.footer__link} href="#">
            rights
          </a>
        </div>
        <div className={styles.footer__bottom}>
          <p className={styles['footer__bottom-text']}>Back to top</p>
          <ButtonWithIcon rotate={270} onClick={scrollToTop} />
        </div>
      </div>
    </footer>
  );
};
