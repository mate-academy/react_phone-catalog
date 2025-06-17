import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/img/Logo.png';
import arrowUp from '/img/arrowRight-Default.png';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer__line">
      <div className="container">
        <footer className="footer">
          <Link to="/" className="footer__logo">
            <img src={logo} alt="Logo" className="footer__logo--pict" />
          </Link>
          <div className="footer__items">
            <Link
              to="https://github.com"
              target="_blank"
              className="footer__items--link"
            >
              Github
            </Link>
            <Link
              to="/"
              className="footer__items--link"
            >
              Contacts
            </Link>
            <Link
              to="/"
              className="footer__items--link"
            >
              Rights
            </Link>
          </div>
          <div className="footer__nav">
            <div className="footer__nav--title">Back to top</div>
            <button className="footer__nav--btn" onClick={scrollToTop} aria-label="Back to top">
              <img src={arrowUp} alt="Back to top" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}; 