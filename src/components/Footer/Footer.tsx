// BLOCO IMPORT
import React from 'react';
import styles from './Footer.module.css';
import logoUrl from '../../assets/img/Logo_footer.png';
import btnBackTop from '../../assets/img/btnBackTop.png';

// BLOCO TYPES
export interface FooterProps {
  logo?: React.ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  className?: string;
}

// COMPONENTE FOOTER
const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`${styles.containerFooter} ${className}`.trim()}>
      <div className={styles.LeftBlock}>
        <img src={logoUrl} alt="MinhaMarca" className={styles.logoImg} />
      </div>

      <div className={styles.centerBlock}>
        <nav className={styles.nav}>
          <a className={styles.link} href="#github">
            GITHUB
          </a>
          <a className={styles.link} href="#contacts">
            CONTACTS
          </a>
          <a className={styles.link} href="#rights">
            RIGHTS
          </a>
        </nav>
      </div>

      <div className={styles.rightBlocks}>
        <span className={styles.textBackTop}>Back To Top</span>
        <img src={btnBackTop} alt="BackTop" className={styles.backTopImg} />
      </div>
    </footer>
  );
};

export default Footer;
