import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <img src="img/Logo.png" />
          </div>

          <div className={styles.actions}>
            <a
              href="https://github.com/mate-academy/react_phone-catalog"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              GitHub
            </a>

            <div className={styles.contacts}>
              <a
                href="mailto:info@phonecatalog.com"
                className={styles.contactLink}
              >
                Contact
              </a>
              <a href="tel:+1234567890" className={styles.contactLink}>
                Phone
              </a>
            </div>
          </div>
          <button
            onClick={scrollToTop}
            className={styles.backToTop}
            type="button"
          >
            Back to top
          </button>
        </div>

        <div className={styles.bottom}>
          <p className={styles.rights} />
        </div>
      </div>
    </footer>
  );
};
