import logo from '../../../public/img/logo/Logo (3).png';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './Footer.module.scss';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smooth scrolling
    });
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer__logo}>
        <img src={logo} alt="Company Logo" />
      </div>
      <nav className={styles.footer__navigation}>
        <ul className={styles.footer__navList}>
          <a href="https://github.com">
            <li className={styles.footer__navItem}>GITHUB</li>
          </a>
          <a href="mailto: test@gmail.com">
            <li className={styles.footer__navItem}>CONTACTS</li>
          </a>
          <a href="https://github.com">
            <li className={styles.footer__navItem}>RIGHTS</li>
          </a>
        </ul>
      </nav>
      <div className={styles.footer__backToTop}>
        <div className={styles.footer__backToTopText}>Back To Top</div>
        <button
          onClick={scrollToTop}
          className={styles.footer__backToTopButton}
        >
          <KeyboardArrowUpIcon />
        </button>
      </div>
    </div>
  );
};

export default Footer;
