import type React from 'react';
import { FooterLinks } from '../FooterLinks';
import { Logo } from '../Logo';
import { ToTopButton } from '../ToTopButton/ToTopButton';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Logo size={'large'} />
      <FooterLinks />
      <ToTopButton />
    </div>
  );
};
