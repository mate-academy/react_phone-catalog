import './Footer.scss';

import { Logo } from '@components/Logo';
import { BackToTop } from '../BackToTop';

export const Footer = () => {
  return (
    <footer className="footer">
      <Logo footer />

      <div className="footer__links">
        <a href="#" className="footer__link">
          Github
        </a>

        <a href="#" className="footer__link">
          Contacts
        </a>

        <a href="#" className="footer__link">
          Rights
        </a>
      </div>

      <BackToTop />
    </footer>
  );
};
