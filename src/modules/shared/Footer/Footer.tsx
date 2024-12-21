import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <div className="footer__container">
        <a href="#" className="footer__logo-container">
          <img src="logo.svg" alt="Nice Gadgets" className="footer__logo" />
        </a>

        <div className="footer__items">
          <Link
            to="https://github.com/hsvirina"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
          <Link
            to="https://www.linkedin.com/in/hanna-svirina-dev/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacts
          </Link>
          <Link to="/" className="footer__link">
            rights
          </Link>
        </div>

        <div className="footer__block">
          <span className="footer__button-title">Back to top</span>
          <button className="footer__button" onClick={backToTop}></button>
        </div>
      </div>
    </div>
  );
};
