import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

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
        <Link to="/" className={styles.logo} aria-label="Nice Gadgets - Home">
          <span>NICE</span>
          <span>GADGETS</span>
        </Link>

        <nav className={styles.links} aria-label="Footer navigation">
          <a
            href="https://github.com/232567/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a href="mailto:contact@example.com">Contacts</a>

          <a
            href="https://github.com/232567/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rights
          </a>
        </nav>

        <button
          type="button"
          className={styles.backToTop}
          onClick={handleBackToTop}
        >
          <span>Back to top</span>

          <span className={styles.topIcon} aria-hidden="true">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
};
