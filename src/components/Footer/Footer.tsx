import { Link } from 'react-router-dom';
import { routes } from '../../router/routes';
import styles from './Footer.module.scss';
import Logo from '../../UI/photos/Logo.svg';
import Chevron from '/img/Chevron.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top_section}>
          <div className={styles.footer__logo}>
            <Link to={routes.home}>
              <img src={Logo} alt="Logo" />
            </Link>
          </div>

          <nav className={styles.footer__nav}>
            <ul className={styles.footer__nav_list}>
              <li className={styles.footer__nav_item}>
                <Link
                  to={routes.github}
                  className={styles.footer__nav_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Link>
              </li>

              <li className={styles.footer__nav_item}>
                <Link to={routes.contacts} className={styles.footer__nav_link}>
                  Contacts
                </Link>
              </li>

              <li className={styles.footer__nav_item}>
                <Link to={routes.rights} className={styles.footer__nav_link}>
                  Rights
                </Link>
              </li>
            </ul>
          </nav>

          <button
            className={styles.footer__back}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span className={styles.footer__back_text}>Back to top</span>
            <span className={styles.footer__back_icon}>
              <img src={Chevron} alt="" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
