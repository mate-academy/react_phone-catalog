import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <a
            href="https://github.com/mate-academy/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            GitHub
          </a>
          <button
            onClick={scrollToTop}
            className={styles.backToTop}
            type="button"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};
