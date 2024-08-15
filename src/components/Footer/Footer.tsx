import { scrollToTop } from '../../utils/scrollToTop';
import styles from './Footer.module.scss';

export const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.logo} onClick={scrollToTop}>
        <img className={styles.logoImg} src="img/icons/logo.svg" alt="Logo" />
      </div>

      <div className={styles.links}>
        <a
          className={styles.link}
          href="https://github.com/yuriiyepikhov"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
        <a className={styles.link} href="#">
          contacts
        </a>
        <a className={styles.link} href="#">
          rights
        </a>
      </div>

      <button className={styles.backToTop} onClick={scrollToTop}>
        Back to top
      </button>
    </div>
  </div>
);
