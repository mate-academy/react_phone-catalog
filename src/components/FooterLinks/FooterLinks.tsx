import type React from 'react';
import styles from './FooterLinks.module.scss';

export const FooterLinks: React.FC = () => {
  return (
    <ul className={styles['footer-links']}>
      <li>
        <a
          href="https://github.com/oksana-zakharevych/react_phone-catalog"
          className={styles['footer-link']}
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </li>
      <li>
        <a href="#" className={styles['footer-link']}>
          Contacts
        </a>
      </li>
      <li>
        <a href="#" className={styles['footer-link']}>
          Rights
        </a>
      </li>
    </ul>
  );
};
