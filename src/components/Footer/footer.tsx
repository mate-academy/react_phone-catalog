import React from 'react';
import styles from './footer.module.scss';
import catalogLogo from './footer-logo/header-logo.png';
import sliderButton from './footer-logo/sliderButton.png';

export const Footer: React.FC = () => {
  return (
    <section className={styles.footerSection}>
      <footer className={styles.footer}>
        <img
          className={styles.footerLogo}
          src={catalogLogo}
          alt="Catalog Logo"
        />
        <ul className={styles.footerList}>
          <li className={styles.footerItems}>
            <a href="#" className={styles.footerLink}>
              Github
            </a>
          </li>
          <li className={styles.footerItems}>
            {' '}
            <a href="#" className={styles.footerLink}>
              Contacts
            </a>
          </li>
          <li className={styles.footerItems}>
            {' '}
            <a href="#" className={styles.footerLink}>
              Rights
            </a>
          </li>
        </ul>
        <div className={styles.toTopContainer}>
          {/* <p className={styles.footerText}>Back to top</p> */}
          <button className={styles.footerButton}>
            <img
              className={styles.buttonIcon}
              src={sliderButton}
              alt="Catalog Logo"
            ></img>
          </button>
        </div>
      </footer>
    </section>
  );
};
