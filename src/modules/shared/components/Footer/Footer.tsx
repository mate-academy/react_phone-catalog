import React from 'react';
import { Icon } from '../Icon';
import styles from './Footer.module.scss';

const GITHUB_REPO_URL =
  'https://github.com/DmytroYakovchuk/react_phone-catalog';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.logo}>
          Nice<span>Gadgets</span>
        </span>

        <div className={styles.links}>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.githubLink}
          >
            <Icon name="github" size={18} />
            GitHub
          </a>

          <button
            type="button"
            className={styles.backToTop}
            aria-label="Back to top"
            onClick={scrollToTop}
          >
            <Icon name="arrow-up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
