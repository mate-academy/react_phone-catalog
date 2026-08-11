import logo from '../../../public/img/Logo.png';
import backToTopbtn from '../../../public/img/icons/back to top btn.png';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__logo}>
          <img className={styles.footer__logoImage} src={logo} alt="Logo" />
        </div>

        <div className={styles.footer__info}>
          <a
            className={styles.footer__infoLink}
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/EgorMamtsev"
          >
            GITHUB
          </a>
          <a className={styles.footer__infoLink} href="">
            CONTACTS
          </a>
          <a className={styles.footer__infoLink} href="">
            RIGHTS
          </a>
        </div>

        <div className={styles.footer__back}>
          <button className={styles.footer__backButton} onClick={scrollToTop}>
            <span className={styles.footer__backLabel}>Back to top</span>
            <img
              className={styles.footer__backImage}
              src={backToTopbtn}
              alt="Back to top"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
