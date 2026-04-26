import React from 'react';
import './Footer.scss';
import logo from '../../../public/img/Logo.svg';
import arrowUp from '../../../public/img/Arrow_Right.svg';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src="./img/Logo.svg" alt="Logo" className="footer-logo" />
        </div>
        <div className="footer-center">
          <a href="/github">Github</a>
          <a href="/contacts">Contacts</a>
          <a href="/rights">Rights</a>
        </div>
        <div className="footer-right">
          <div className="back-to-top-text">Back to top</div>
          <button
            className="back-to-top-button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="./img/Arrow_Top.svg" alt="Arrow up" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
