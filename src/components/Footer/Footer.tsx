import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import logo from '../../assets/icons/Logo.svg';
import { Chevron } from '../icons/Chevron';
import { SecondaryButton } from '../SecondaryButton';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Nice Gadgets" />
        </Link>
        <div className={styles.mainLinks}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Vladislav-Korsun"
            className={styles.mainLinks__link}
          >
            GitHub
          </a>
          <a href="///" className={styles.mainLinks__link}>
            Contacts
          </a>
          <a href="///" className={styles.mainLinks__link}>
            Rights
          </a>
        </div>
        <div className={styles.backToTop}>
          <p className={styles.backToTop__text}>Back to top</p>
          <SecondaryButton
            type="button"
            aria-label="Back to top"
            onClick={handleBackToTop}
          >
            <Chevron direction="up" />
          </SecondaryButton>
        </div>
      </div>
    </footer>
  );
};
