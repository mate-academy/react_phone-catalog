import { useCallback } from 'react';
import { IconLogo, IconChevronArrowRight } from '../Icons';
import styles from './Footer.module.scss';

export function Footer(): JSX.Element {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.left}>
          <IconLogo className={styles.logo} />
        </div>
        <div className={styles.center}>
          <a
            href="https://github.com/mate-academy/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Github
          </a>
          <span className={styles.link}>Contacts</span>
          <span className={styles.link}>rights</span>
        </div>
        <div className={styles.right}>
          <button
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span className={styles.backToTopText}>Back to top</span>
            <IconChevronArrowRight className={styles.backToTopIcon} />
          </button>
        </div>
      </div>
    </footer>
  );
}
