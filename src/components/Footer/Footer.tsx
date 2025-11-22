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
      <div className={styles.leftBlock}>
        <img src={logoUrl} alt="MinhaMarca" className={styles.logoImg} />
      </div>

      <div className={styles.centerBlock}>
        <nav className={styles.nav} aria-label="Footer navigation">
          <a
            className={styles.link}
            href="https://github.com/DemetriodosAnjos/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>

          <a
            className={styles.link}
            href="https://wa.me/qr/3YKLDKONQ5A7E1"
            target="_blank"
            rel="noopener noreferrer"
          >
            CONTACT
          </a>

          <a className={styles.link} href="#rights">
            RIGHTS
          </a>
        </nav>
      </div>

      <div className={styles.rightBlocks}>
        <a className={styles.textBackTop} href="#top" aria-label="Back to top">
          Back To Top
        </a>
        <a href="#top" aria-label="Back to top">
          <img src={btnBackTop} alt="BackTop" className={styles.backTopImg} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
