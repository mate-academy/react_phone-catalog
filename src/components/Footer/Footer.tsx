import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoBlock}>
          <img
            src={`${BASE_URL}/img/Logo.png`}
            alt="Logo"
            className={styles.logo}
          />
        </Link>

        <ul className={styles.list}>
          <Link
            to="https://github.com/andreyysak"
            target="blank"
            className={styles.link}
          >
            github
          </Link>
          <Link to="/contacts" className={styles.link}>
            contacts
          </Link>
          <Link to="/rights" className={styles.link}>
            rights
          </Link>
        </ul>

        <div className={styles.action}>
          <span className={styles.span}>Back to top</span>
          <button className={styles.buttonTop} onClick={handleScrollToTop}>
            <img
              src={`${BASE_URL}/icons/ArrowUp.svg`}
              alt="Back to top"
              className={styles.arrow}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
