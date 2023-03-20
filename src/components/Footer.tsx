import React from 'react';
import { FooterNav } from './FooterNav';
import { Logo } from './Logo';
import { BackToTop } from './BackToTop';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Logo className="footer__logo" />
      <FooterNav />
      <BackToTop />
    </footer>
  );
};
