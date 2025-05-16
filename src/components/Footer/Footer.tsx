import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      {/* Left Section: Logo */}
      <div className={styles.leftSection}>
        <img
          src="/img/icons/dark_logo.svg"
          alt="Logo"
          className={styles.logo}
        />
      </div>

      {/* Middle Section: Links */}
      <div className={styles.middleSection}>
        <a
          href="https://github.com/Csillag61/react_phone-catalog"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <span> | </span>
        <a href="/contacts">Contacts</a>
        <span> | </span>
        <a href="/rights">Rights</a>
      </div>

      {/* Right Section: Back to Top */}
      <div className={styles.rightSection}>
        <button onClick={scrollToTop} className={styles.backToTop}>
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
