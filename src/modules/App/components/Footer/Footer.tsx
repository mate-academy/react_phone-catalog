import './Footer.scss';

import { Logo } from '@components/Logo';
import { BackToTop } from '../BackToTop';

export const Footer = () => {
  return (
    <footer className="footer">
      <Logo footer />

      <div className="footer__links">
        <a href="#">Github</a>

        <a href="#">Contacts</a>

        <a href="#">Rights</a>
      </div>

      <BackToTop />
    </footer>
  );
};
