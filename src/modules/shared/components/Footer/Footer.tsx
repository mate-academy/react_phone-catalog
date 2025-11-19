
import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        NICE GADGETS
      </div>

      {/* Seção de Navegação (Links centrais) */}
      <nav className={styles.navLinks}>
        <a href="https://github.com/Olivio-Neves" className={styles.navLink}>GITHUB</a>
        <a href="#contacts" className={styles.navLink}>CONTACTS</a>
        <a href="#rights" className={styles.navLink}>RIGHTS</a>
      </nav>

      <div className={styles.backToTopContainer}>
        <span className={styles.backToTopText}>Back to top</span>
        <button onClick={scrollToTop} className={styles.backToTopButton}>
          <span className={styles.arrowIcon}>▲</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;