import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <Link to="/" className={styles.logo}>
            <img src="img/logo/Logo.png" alt="Logo" />
          </Link>

          <div className={styles.links}>
            <a
              href="https://github.com/Kanezoor/react_phone-catalog"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <a href="#">Contacts</a>
            <a href="#">Rights</a>
          </div>

          <div className={styles.backToTop}>
            <span onClick={handleScrollToTop}>Back to top</span>
            <button
              className={styles.arrowButton}
              onClick={handleScrollToTop}
              aria-label="Scroll to top"
            >
              <img src="img/icons/ArrowUp.png" alt="Up" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
