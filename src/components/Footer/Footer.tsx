import { FooterButton } from '../FooterButton';
import { FooterLogo } from '../FooterLogo';
import { FooterNav } from '../FooterNav';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <FooterLogo />

      <FooterNav />

      <FooterButton />
    </div>
  </footer>
);
