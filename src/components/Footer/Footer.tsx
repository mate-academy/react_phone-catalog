import React from 'react';
import { SiteLogo } from '../SiteLogo/SiteLogo';
import footerStyles from './Footer.module.scss';
import { FooterNav } from './components/FooterNav/FooterNav';
import { BackToTop } from './components/BackToTop';

export const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footer__content}>
        <SiteLogo />
        <FooterNav />
        <BackToTop />
      </div>
    </footer>
  );
};
