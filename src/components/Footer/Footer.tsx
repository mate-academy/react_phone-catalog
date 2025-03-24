import React from 'react';
import { Link } from 'react-router-dom';

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
            <img
              src="/img/Logo.svg"
              alt="Logo"
              className="footer__logo--pict"
            />
          </Link>
          <div className="footer__items">
            <Link
              to="https://github.com/dima91020/react_phone-catalog"
              target="_blank"
              className="footer__items--link"
            >
              Github
            </Link>
            <Link
              to="https://t.me/devlll999"
              target="_blynk"
              className="footer__items--link"
            >
              Contacts
            </Link>
            <Link
              to="https://github.com/dima91020"
              target="_blynk"
              className="footer__items--link"
            >
              Rights
            </Link>
          </div>
          <div className="footer__nav">
            <div className="footer__nav--title">Back to top</div>
            <button className="footer__nav--btn" onClick={scrollToTop}></button>
          </div>
        </footer>
      </div>
    </div>
  );
};
