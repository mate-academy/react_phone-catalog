import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer_content}>
          <div className={styles.footer__logo_container}>
            <Link to="/" className={styles.footer__logo_link}>
              <img
                className={styles.footer__logo}
                src="img/logo.png"
                alt="Nice gadgets logo"
              />
            </Link>
          </div>
          <div className={styles.footer__link__container}>
            <Link
              to="https://github.com/FS-MAR24-Code-Busters/react_phone-catalog"
              className={styles.footer__link}
            >
              github
            </Link>
            <Link to="#" className={styles.footer__link}>
              contacts
            </Link>
            <Link to="#" className={styles.footer__link}>
              rights
            </Link>
          </div>
          <div className={styles.back_to_top_content}>
            <Link to="#" className={styles.back__to__top_link}>
              <span className={styles.back__to__top}>back to top</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
