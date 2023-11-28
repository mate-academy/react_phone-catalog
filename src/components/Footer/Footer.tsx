import { FooterAnchor } from './FooterAnchor';
import { FooterItems } from './FooterItems';
import { FooterLogo } from './FooterLogo';

export const Footer = () => (
  <footer className="section footer">
    <div className="section__container">
      <div className="footer__block">
        <FooterLogo />
        <FooterItems />
        <FooterAnchor />
      </div>
    </div>
  </footer>
);
