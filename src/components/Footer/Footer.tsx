import styles from '../Footer/Footer.module.scss';
import arrowUp from '../../images/Icons/Arrow-Up.png';
import logo from '../../images/Icons/Logo.svg';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <NavLink className={styles.footer__logoLink} to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
        <div className={styles.footer__links}>
          <a
            className={styles.footer__link}
            href="https://github.com/OwlDevcUA"
          >
            GITHUB
          </a>
          <a
            className={styles.footer__link}
            // eslint-disable-next-line max-len
            href="https://www.linkedin.com/in/kyryl-kostiuk-515b05315/?locale=uk"
          >
            CONTACTS
          </a>
          <a className={styles.footer__link} href="#">
            RIGHTS
          </a>
        </div>
        <div className={styles.footer__backToTopLink}>
          <a
            onClick={() => backToTop()}
            className={styles.footer__backToTopLinkText}
          >
            Back to top
          </a>
          <a
            onClick={() => backToTop()}
            className={styles.footer__backToTopLinkIcon}
          >
            <img src={arrowUp} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};
