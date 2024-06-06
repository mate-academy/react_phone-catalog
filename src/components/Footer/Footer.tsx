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
              target="_blank"
            >
              github
            </Link>
            <Link to="#" className={styles.footer__link} target="_blank">
              contacts
            </Link>
            <Link to="#" className={styles.footer__link} target="_blank">
              rights
            </Link>
          </div>
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={styles.back_to_top_content}
          >
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
