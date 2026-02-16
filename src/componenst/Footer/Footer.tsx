import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__inner}>
      © {new Date().getFullYear()} Gadget Catalog
    </div>
  </footer>
);

export default Footer;
