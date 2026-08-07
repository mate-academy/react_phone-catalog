import React from 'react';
import styles from './FooterNav.module.scss';
import { FOOTER_NAV_ITEMS } from './constants/FooterNavItems';

export const FooterNav: React.FC = () => (
  <nav className={styles.footerNav}>
    <ul className={styles.footerNavList}>
      {FOOTER_NAV_ITEMS.map(item => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerNavLink}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
