import React from 'react';
import NavFooter from './components/NavFooter/NavFooter';
import FooterLogo from './components/FooterLogo/FooterLogo';
import { RotatedButton } from '../Buttons/Button';

const Footer: React.FC = () => {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <FooterLogo />

        <NavFooter />

        <button className="footer__back" onClick={backToTop}>
          Back to top
          <RotatedButton />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
