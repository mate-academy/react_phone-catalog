import React from 'react';

import { FOOTER_LINKS } from '../../constants';

import { Logo } from '../Logo';
import { BackToTop } from '../BackToTop';

import styles from './Footer.module.scss';
import logoStyles from '../Logo/Logo.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footer__nav}>
        <Logo className={logoStyles['logo--big']} />

        <ul className={styles.footer__list}>
          {FOOTER_LINKS.map(({ label, href }) => (
            <li key={label} className={styles.footer__item}>
              <a
                href={href}
                className={styles.footer__link}
                target="_blank"
                rel="noreferrer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <BackToTop />
      </nav>
    </footer>
  );
};
